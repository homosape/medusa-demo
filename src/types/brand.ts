import schemas from "@/schemas";
import { z } from "zod";

type Brand = z.infer<typeof schemas.brand>;

export type { Brand };
