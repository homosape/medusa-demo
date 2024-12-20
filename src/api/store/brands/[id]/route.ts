import { MARKETPLACE_MODULE } from "@/modules/marketplace";
import MarketplaceModuleService from "@/modules/marketplace/service";
import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { MedusaError } from "@medusajs/framework/utils";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const brand_id = req.params.id;
  const marketplaceModule: MarketplaceModuleService =
    req.scope.resolve(MARKETPLACE_MODULE);

  const brand = await marketplaceModule.retrieveBrand(brand_id);

  if (!brand || Object.keys(brand).length === 0) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Brand not found");
  }

  res.status(200).json(brand);
};
