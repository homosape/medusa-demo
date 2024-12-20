import { model } from "@medusajs/framework/utils";
import Vendor from "./vendor";
import Product from "./product";

const Brand = model.define("brand", {
  id: model.id().primaryKey(),
  external_id: model.text().unique().nullable(),
  title: model.text(),
  logo_url: model.text().nullable(),
  vendor: model.belongsTo(() => Vendor, { mappedBy: "brands" }),
  products: model.hasMany(() => Product, { mappedBy: "brand" }),
});

export default Brand;
