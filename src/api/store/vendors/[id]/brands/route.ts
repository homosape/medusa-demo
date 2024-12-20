import { MARKETPLACE_MODULE } from "@/modules/marketplace";
import MarketplaceModuleService from "@/modules/marketplace/service";
import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const vendor_id = req.params.id;
  const marketplaceModule: MarketplaceModuleService =
    req.scope.resolve(MARKETPLACE_MODULE);

  const brands = await marketplaceModule.listBrands(
    { vendor_id },
    {
      order: {
        created_at: "DESC",
      },
    }
  );

  res.status(200).json(brands);
};
