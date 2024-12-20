import { MARKETPLACE_MODULE } from "@/modules/marketplace";
import MarketplaceModuleService from "@/modules/marketplace/service";
import schemas from "@/schemas";
import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http";

export const PUT = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const id = req.params.bid;

  const data = schemas.brand.parse(req.body);

  const marketplaceModule: MarketplaceModuleService =
    req.scope.resolve(MARKETPLACE_MODULE);

  const existingBrand = await marketplaceModule.retrieveBrand(id);

  const brand = await marketplaceModule.updateBrands({
    ...existingBrand,
    ...data,
  });

  return res.status(200).json(brand);
};
