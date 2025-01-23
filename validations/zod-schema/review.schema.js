import { z } from "zod";
import { StringSchema } from "./common/string-schema.js";

export class ReviewSchema {
  static CREATE = z.object({
    book_id: StringSchema.IS_NUMBER,
    rating: z.number().int().min(1).max(5),
    review: z.string().min(1),
  });
}
