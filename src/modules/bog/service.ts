// @ts-nocheck
import {
  AbstractPaymentProvider,
  BigNumber,
  Modules,
} from "@medusajs/framework/utils";
import {
  BigNumberInput,
  BigNumberValue,
  CartDTO,
  CreatePaymentProviderSession,
  PaymentProviderContext,
  PaymentProviderError,
  PaymentProviderSessionResponse,
  PaymentSessionStatus,
  ProviderWebhookPayload,
  UpdatePaymentProviderSession,
  WebhookActionResult,
} from "@medusajs/types";
import { BogAuthResponse, BogOrder, BogPaymentResponse } from "src/types/bog";

class BogProviderService extends AbstractPaymentProvider {
  static identifier = "bog-payment";
  protected token: string | null;
  protected paymentContext: {
    context: PaymentProviderContext;
    amount: BigNumberInput;
    currency_code: string;
  } | null;

  private async authenticateWithProvider() {
    const client_id = process.env.BOG_CLIENT_ID;
    const client_secret = process.env.BOG_CLIENT_SECRET;

    if (!client_id || !client_secret) {
      throw new Error(
        "Failed to locate Bank of Georgia credentials for authentication"
      );
    }

    const res = await fetch(
      "https://oauth2.bog.ge/auth/realms/bog/protocol/openid-connect/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            client_id + ":" + client_secret
          ).toString("base64")}`,
        },
        body: JSON.stringify({ grant_type: "client_credentials" }),
      }
    );
    const data: BogAuthResponse = await res.json();
    this.token = data.access_token;
  }

  private convertToNumber(value: BigNumberValue): number {
    if (typeof value === "number") return value;
    if (typeof value === "string") return Number(value);
    if ("numeric" in value) return value.numeric;
    return value.toNumber();
  }

  private generateOrderData(cart: CartDTO) {
    const { total, currency_code, items } = cart;
    const { context } = this.paymentContext;
    const {
      customer: { first_name, last_name },
    } = context;

    const basket: BogOrder["purchase_units"]["basket"] = items.map((i) => {
      const {
        quantity,
        unit_price,
        thumbnail,
        total,
        product_id,
        product_description,
      } = i;

      return {
        product_id,
        description: product_description,
        quantity: this.convertToNumber(quantity),
        unit_price: this.convertToNumber(unit_price),
        total_price: this.convertToNumber(total),
        image: thumbnail,
      };
    });

    const order: BogOrder = {
      callback_url: "https://example.com",
      purchase_units: {
        basket,
        currency: currency_code as BogOrder["purchase_units"]["currency"],
        total_amount: this.convertToNumber(total),
      },
      application_type: "web",
      capture: "automatic",
      ...(first_name &&
        last_name && { buyer: { full_name: `${first_name} ${last_name}` } }),
      redirect_urls: {
        success: "https://example.com",
        fail: "https://example.com",
      },
    };

    return order;
  }

  async initiatePayment(
    context: CreatePaymentProviderSession
  ): Promise<PaymentProviderError | PaymentProviderSessionResponse> {
    try {
      console.log("context during initiatePayment", JSON.stringify(context));

      this.paymentContext = context;
      await this.authenticateWithProvider();
    } catch (e) {
      return {
        error: e,
        code: "unknown",
        detail: e,
      };
    }
  }

  async authorizePayment(
    paymentSessionData: Record<string, unknown>,
    context: Record<string, unknown>
  ): Promise<
    | PaymentProviderError
    | {
        status: PaymentSessionStatus;
        data: PaymentProviderSessionResponse["data"];
      }
  > {
    try {
      console.log("context during authorizePayment", JSON.stringify(context));

      const cart_id = context.cart_id as string;

      const res = await fetch(
        "https://api.bog.ge/payments/v1/ecommerce/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({}),
        }
      );
      const data = await res.json();
      return {
        data,
        status: "captured",
      };
    } catch (e) {
      return {
        error: e,
        code: "unknown",
        detail: e,
      };
    }
  }

  async capturePayment(
    paymentData: Record<string, unknown>
  ): Promise<PaymentProviderError | PaymentProviderSessionResponse["data"]> {
    try {
      //
    } catch (e) {
      return {
        error: e,
        code: "unknown",
        detail: e,
      };
    }
  }

  async getPaymentStatus(
    paymentSessionData: Record<string, unknown>
  ): Promise<PaymentSessionStatus> {
    try {
      const res = await fetch(
        `https://api.bog.ge/payments/v1/receipt/${paymentSessionData.id}`,
        { headers: { Authorization: `Bearer ${this.token}` } }
      );
      const data: BogPaymentResponse = await res.json();
      const order_status = data.order_status;

      switch (order_status.key) {
        case "created":
          return "authorized";
        case "completed":
          return "captured";
        case "blocked":
          return "error";
        case "rejected":
          return "error";
        default:
          return "pending";
      }
    } catch (e) {
      return "error";
    }
  }

  async refundPayment(
    paymentData: Record<string, unknown>,
    refundAmount: number
  ): Promise<PaymentProviderError | PaymentProviderSessionResponse["data"]> {
    try {
      await fetch(
        `https://api.bog.ge/payments/v1/payment/refund/${paymentData.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({ amount: refundAmount }),
        }
      );
    } catch (e) {
      return {
        error: e,
        code: "unknown",
        detail: e,
      };
    }
  }

  async cancelPayment(
    paymentData: Record<string, unknown>
  ): Promise<PaymentProviderError | PaymentProviderSessionResponse["data"]> {
    try {
      //
    } catch (e) {
      return {
        error: e,
        code: "unknown",
        detail: e,
      };
    }
  }

  async retrievePayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<PaymentProviderError | PaymentProviderSessionResponse["data"]> {
    try {
      const res = await fetch(
        `https://api.bog.ge/payments/v1/receipt/${paymentSessionData.id}`,
        { headers: { Authorization: `Bearer ${this.token}` } }
      );
      return await res.json();
    } catch (e) {
      return {
        error: e,
        code: "unknown",
        detail: e,
      };
    }
  }

  async deletePayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<PaymentProviderError | PaymentProviderSessionResponse["data"]> {
    try {
      this.token = null;
    } catch (e) {
      return {
        error: e,
        code: "unknown",
        detail: e,
      };
    }
  }

  async updatePayment({
    data,
    ...context
  }: UpdatePaymentProviderSession): Promise<
    PaymentProviderError | PaymentProviderSessionResponse
  > {
    try {
      console.log("Data field during updatePayment", JSON.stringify(context));
      this.paymentContext = context;
    } catch (e) {
      return {
        error: e,
        code: "unknown",
        detail: e,
      };
    }
  }

  async getWebhookActionAndData(
    payload: ProviderWebhookPayload["payload"]
  ): Promise<WebhookActionResult> {
    const { data, rawData, headers } = payload;

    try {
      switch (data.event_type) {
        case "authorized_amount":
          return {
            action: "authorized",
            data: {
              session_id: (data.metadata as Record<string, any>).session_id,
              amount: new BigNumber(data.amount as number),
            },
          };
        case "success":
          return {
            action: "captured",
            data: {
              session_id: (data.metadata as Record<string, any>).session_id,
              amount: new BigNumber(data.amount as number),
            },
          };
        default:
          return {
            action: "not_supported",
          };
      }
    } catch (e) {
      return {
        action: "failed",
        data: {
          session_id: (data.metadata as Record<string, any>).session_id,
          amount: new BigNumber(data.amount as number),
        },
      };
    }
  }
}

export default BogProviderService;
