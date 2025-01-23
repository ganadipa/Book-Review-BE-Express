import { z } from "zod";

export class BookSchema {
  static CREATE = z.object({
    title: z.string().min(1, "Title is required").max(255, "Title is too long"),
    author: z
      .string()
      .min(1, "Author is required")
      .max(255, "Author is too long"),
    published_date: z.string().refine(
      (date) => {
        // e.g. 2021-01-01
        if (!date) return true; // Allow null/undefined for optional field
        return !isNaN(Date.parse(date)); // Validate if it's a valid date
      },
      { message: "Invalid date format" }
    ),
  });

  static PARTIAL_UPDATE = z.object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(255, "Title is too long")
      .optional(),
    author: z
      .string()
      .min(1, "Author is required")
      .max(255, "Author is too long")
      .optional(),
    published_date: z
      .string()
      .optional()
      .refine(
        (date) => {
          // e.g. 2021-01-01
          if (!date) return true; // Allow null/undefined for optional field
          return !isNaN(Date.parse(date)); // Validate if it's a valid date
        },
        { message: "Invalid date format" }
      ),
  });
}
