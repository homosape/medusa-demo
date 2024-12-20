import { Brand } from "@/types/brand";
import {
  createWorkflow,
  WorkflowResponse,
  transform,
} from "@medusajs/framework/workflows-sdk";
import createBrandsStep from "./steps/create-brands";

interface CreateBrandsWorkflowInput {
  brands: Brand[];
  vendor_ids: string[];
}

const createBrandsWorkflow = createWorkflow(
  "create-brands-workflow",
  (input: CreateBrandsWorkflowInput) => {
    const { brands, vendor_ids } = transform({ input }, (data) => ({
      brands: data.input.brands ?? [],
      vendor_ids: data.input.vendor_ids ?? [],
    }));

    const ids = createBrandsStep({ brands, vendor_ids });
    return new WorkflowResponse(ids);
  }
);

export default createBrandsWorkflow;
