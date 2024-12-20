import { MARKETPLACE_MODULE } from "@/modules/marketplace";
import MarketplaceModuleService from "@/modules/marketplace/service";
import schemas from "@/schemas";
import { Vendor } from "@/types/vendor";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

interface CreateVendorsStepInput {
  vendors: Vendor[];
}

const createVendorsStep = createStep(
  "create-vendors-step",
  async ({ vendors }: CreateVendorsStepInput, { container }) => {
    const ids: string[] = [];

    const marketplaceModule: MarketplaceModuleService =
      container.resolve(MARKETPLACE_MODULE);

    for await (const vendor of vendors) {
      const data = schemas.vendor.parse(vendor);
      const result = await marketplaceModule.createVendors(data);
      ids.push(result.id);
    }

    return new StepResponse(ids);
  }
);

export default createVendorsStep;
