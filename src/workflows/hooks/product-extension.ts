import { createProductsWorkflow } from "@medusajs/medusa/core-flows";
import {
  createProductExtensionWorkflow,
  createProductExtensionWorkflowInput,
} from "../product-extension";

createProductsWorkflow.hooks.productsCreated(
  async ({ products, additional_data }, { container }) => {
    const workflow = createProductExtensionWorkflow(container);

    let extensions: Array<{ vendor_id: string; brand_id: string }> | null =
      null;

    if (additional_data && "product_extensions" in additional_data) {
      const product_extensions = additional_data.product_extensions;

      if (Array.isArray(product_extensions)) {
        extensions = product_extensions;
      }
    }

    for (const product of products) {
      if (extensions !== null) {
        const randomNum = Math.floor(Math.random() * extensions.length);
        const { vendor_id, brand_id } = extensions[randomNum];

        await workflow.run({
          input: { product, additional_data: { vendor_id, brand_id } },
        });
      } else {
        await workflow.run({
          input: {
            product,
            additional_data,
          } as createProductExtensionWorkflowInput,
        });
      }
    }
  }
);
