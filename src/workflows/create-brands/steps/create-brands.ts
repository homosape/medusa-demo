import { MARKETPLACE_MODULE } from "@/modules/marketplace";
import MarketplaceModuleService from "@/modules/marketplace/service";
import schemas from "@/schemas";
import { Brand } from "@/types/brand";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

interface CreateBrandStepInput {
  brands: Brand[];
  vendor_ids: string[];
}

const createBrandsStep = createStep(
  "create-brands-step",
  async ({ brands, vendor_ids }: CreateBrandStepInput, { container }) => {
    const ids: { brand_id: string; vendor_id: string }[] = [];

    const marketplaceModule: MarketplaceModuleService =
      container.resolve(MARKETPLACE_MODULE);

    for (const brand of brands) {
      const randomNum = Math.floor(Math.random() * vendor_ids.length);
      const vendor_id = vendor_ids[randomNum];

      const data = schemas.brand.parse(brand);
      const result = await marketplaceModule.createBrands({
        ...data,
        vendor_id,
      });

      ids.push({ brand_id: result.id, vendor_id });
    }

    return new StepResponse(ids);
  }
);

export default createBrandsStep;
