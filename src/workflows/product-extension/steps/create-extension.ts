import { MARKETPLACE_MODULE } from "@/modules/marketplace";
import MarketplaceModuleService from "@/modules/marketplace/service";
import { MedusaError } from "@medusajs/framework/utils";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

type CreateExtensionStepInput = {
  vendor_id: string;
  brand_id: string;
};

export const createExtensionStep = createStep(
  "create-extension",
  async (data: CreateExtensionStepInput, { container }) => {
    if (!data.vendor_id) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Missing vendor_id"
      );
    }

    if (!data.brand_id) {
      throw new MedusaError(MedusaError.Types.INVALID_DATA, "Missing brand_id");
    }

    const helloModuleService: MarketplaceModuleService =
      container.resolve(MARKETPLACE_MODULE);

    const extension = await helloModuleService.createProductExtensions(data);

    return new StepResponse(extension, extension);
  },
  async (extension, { container }) => {
    const helloModuleService: MarketplaceModuleService =
      container.resolve(MARKETPLACE_MODULE);

    await helloModuleService.deleteProductExtensions(extension.id);
  }
);
