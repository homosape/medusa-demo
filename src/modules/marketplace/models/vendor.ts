import { model } from "@medusajs/framework/utils";
import Brand from "./brand";
import Product from "./product";

const Vendor = model.define("vendor", {
  id: model.id().primaryKey(),
  external_id: model.text().unique().nullable(),
  title: model.text(),
  company_id: model.text().unique(),
  email: model.text(),
  phone: model.text(),
  address: model.json(),
  brands: model.hasMany(() => Brand, { mappedBy: "vendor" }),
  products: model.hasMany(() => Product, { mappedBy: "vendor" }),
});

export default Vendor;
