import { MARKETPLACE_MODULE } from "@/modules/marketplace";
import MarketplaceModuleService from "@/modules/marketplace/service";
import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { MedusaError } from "@medusajs/framework/utils";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const skip = req.query.skip;
  const limit = req.query.limit ? Number(req.query.limit) : 25;

  if (!skip) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "skip query parameter is required"
    );
  }

  const marketplaceModule: MarketplaceModuleService =
    req.scope.resolve(MARKETPLACE_MODULE);

  const brands = await marketplaceModule.listBrands(
    {},
    {
      skip: Number(skip),
      take: limit,
      order: {
        created_at: "DESC",
      },
    }
  );

  res.status(200).json(brands);
};
