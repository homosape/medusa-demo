import { MARKETPLACE_MODULE } from "@/modules/marketplace";
import MarketplaceModuleService from "@/modules/marketplace/service";
import schemas from "@/schemas";
import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http";

export const POST = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const vendor_id = req.params.id;
  const data = schemas.brand.parse(req.body);

  const marketplaceModule: MarketplaceModuleService =
    req.scope.resolve(MARKETPLACE_MODULE);

  const brand = await marketplaceModule.createBrands({ vendor_id, ...data });

  return res.status(200).json(brand);
};
