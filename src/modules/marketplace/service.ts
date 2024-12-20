import { MedusaService } from "@medusajs/framework/utils";
import Vendor from "./models/vendor";
import Brand from "./models/brand";
import ProductExtension from "./models/product";

class MarketplaceModuleService extends MedusaService({
  Vendor,
  Brand,
  ProductExtension,
}) {}

export default MarketplaceModuleService;
