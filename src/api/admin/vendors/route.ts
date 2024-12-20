import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http";
import MarketplaceModuleService from "@/modules/marketplace/service";
import { MARKETPLACE_MODULE } from "@/modules/marketplace";
import schemas from "@/schemas";

export const POST = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const data = schemas.vendor.parse(req.body);

  const marketplaceModule: MarketplaceModuleService =
    req.scope.resolve(MARKETPLACE_MODULE);

  const vendor = await marketplaceModule.createVendors(data);

  return res.status(200).json(vendor);
};
