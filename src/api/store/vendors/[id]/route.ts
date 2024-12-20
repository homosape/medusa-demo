import { MARKETPLACE_MODULE } from "@/modules/marketplace";
import MarketplaceModuleService from "@/modules/marketplace/service";
import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { MedusaError } from "@medusajs/framework/utils";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const vendor_id = req.params.id;
  const marketplaceModule: MarketplaceModuleService =
    req.scope.resolve(MARKETPLACE_MODULE);

  const vendor = await marketplaceModule.retrieveVendor(vendor_id);

  if (!vendor || Object.keys(vendor).length === 0) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Vendor not found");
  }

  res.status(200).json(vendor);
};
