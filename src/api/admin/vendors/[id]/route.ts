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
  const vendor_id = req.params.id;

  const data = schemas.vendor.parse(req.body);

  const marketplaceModule: MarketplaceModuleService =
    req.scope.resolve(MARKETPLACE_MODULE);

  const existingVendor = await marketplaceModule.retrieveVendor(vendor_id);

  const vendor = await marketplaceModule.updateVendors({
    ...existingVendor,
    ...data,
  });

  return res.status(200).json(vendor);
};
