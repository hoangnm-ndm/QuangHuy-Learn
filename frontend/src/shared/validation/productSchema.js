import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  price: z.number().min(0, "Price must be a positive number"),
  description: z.string().optional(),
  quantity: z.number().min(0, "Quantity must be a positive number").optional(),
  thumbnail: z.string().url("Thumbnail must be a valid URL").optional(),
});
