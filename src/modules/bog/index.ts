// @ts-nocheck
import BogProviderService from "./service";
import { ModuleProvider } from "@medusajs/framework/utils";

export default ModuleProvider("bog-payment", {
  services: [BogProviderService],
});
