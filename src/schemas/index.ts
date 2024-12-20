import { z } from "zod";

export default {
  vendor: z
    .object({
      external_id: z.string().optional().nullable(),
      title: z.string().max(50, { message: "Title max size is 50 characters" }),
      company_id: z
        .string()
        .max(18, { message: "Company ID max size is 18 characters" }),
      email: z.string().email({ message: "Invalid email address" }),
      phone: z.string().max(18, { message: "Phone max size is 18 characters" }),
      address: z
        .object({
          country: z.enum([
            "AT",
            "BE",
            "BG",
            "BY",
            "HR",
            "CY",
            "CZ",
            "DK",
            "EE",
            "FI",
            "FR",
            "GE",
            "DE",
            "GR",
            "HU",
            "IS",
            "IE",
            "IT",
            "LV",
            "LI",
            "LT",
            "LU",
            "MT",
            "NL",
            "NO",
            "PL",
            "PT",
            "RO",
            "RU",
            "SK",
            "SI",
            "ES",
            "SE",
            "CH",
            "GB",
          ]),
          city: z
            .string()
            .max(24, { message: "City max size is 24 characters" }),
          street: z
            .string()
            .max(36, { message: "Street max size is 36 characters" }),
          zipCode: z
            .string()
            .max(18, { message: "Postal code max size is 18 characters" })
            .optional(),
        })
        .strict(),
    })
    .strict(),
  brand: z
    .object({
      external_id: z.string().optional().nullable(),
      title: z.string().max(50, { message: "Title max size is 50 characters" }),
      logo_url: z.string().url().optional().nullable(),
    })
    .strict(),
};
