import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  price: z
    .number()
    .min(0, { message: "Price must be greater than or equal to 0" }),
  description: z.string().optional(),
  quantity: z
    .number()
    .min(0, { message: "Quantity must be greater than or equal to 0" })
    .optional(),
  thumbnail: z
    .string()
    .url({ message: "Thumbnail must be a valid URL" })
    .optional(),
});
