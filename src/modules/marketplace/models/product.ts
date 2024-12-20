import { model } from "@medusajs/framework/utils";
import Vendor from "./vendor";
import Brand from "./brand";

const ProductExtension = model.define("product_extension", {
  id: model.id().primaryKey(),
  brand: model.belongsTo(() => Brand, { mappedBy: "products" }),
  vendor: model.belongsTo(() => Vendor, { mappedBy: "products" }),
});

export default ProductExtension;
