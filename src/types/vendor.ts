import schemas from "@/schemas";
import { z } from "zod";

type Vendor = z.infer<typeof schemas.vendor>;

export type { Vendor };
