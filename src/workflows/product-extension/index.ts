import {
  createWorkflow,
  transform,
  when,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { ProductDTO } from "@medusajs/framework/types";
import { createRemoteLinkStep } from "@medusajs/medusa/core-flows";
import { Modules } from "@medusajs/framework/utils";
import { createExtensionStep } from "./steps/create-extension";
import { MARKETPLACE_MODULE } from "@/modules/marketplace";

export type createProductExtensionWorkflowInput = {
  product: ProductDTO;
  additional_data?: {
    vendor_id?: string;
    brand_id?: string;
  };
};

export const createProductExtensionWorkflow = createWorkflow(
  "create-product-extension",
  (input: createProductExtensionWorkflowInput) => {
    const { vendor_id, brand_id } = transform({ input }, (data) => ({
      vendor_id: data.input.additional_data?.vendor_id ?? "",
      brand_id: data.input.additional_data?.brand_id ?? "",
    }));

    const extension = createExtensionStep({ vendor_id, brand_id });

    when({ extension }, ({ extension }) => extension !== undefined).then(() => {
      createRemoteLinkStep([
        {
          [Modules.PRODUCT]: {
            product_id: input.product.id,
          },
          [MARKETPLACE_MODULE]: {
            product_extension_id: extension.id,
          },
        },
      ]);
    });

    return new WorkflowResponse({
      extension,
    });
  }
);
