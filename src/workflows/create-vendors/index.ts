import { Vendor } from "@/types/vendor";
import {
  createWorkflow,
  WorkflowResponse,
  transform,
} from "@medusajs/framework/workflows-sdk";
import createVendorsStep from "./steps/create-vendors";

interface CreateVendorsWorkflowInput {
  vendors: Vendor[];
}

const createVendorsWorkflow = createWorkflow(
  "create-vendors-work",
  (input: CreateVendorsWorkflowInput) => {
    const { vendors } = transform({ input }, (data) => ({
      vendors: data.input.vendors ?? [],
    }));

    const ids = createVendorsStep({ vendors });

    return new WorkflowResponse(ids);
  }
);

export default createVendorsWorkflow;
