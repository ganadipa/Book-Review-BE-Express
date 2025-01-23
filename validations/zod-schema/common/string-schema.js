import { z } from "zod";

export class StringSchema {
  static IS_NUMBER = z.string().refine((value) => !isNaN(Number(value)), {
    message: "The string must be a valid number.",
  });
}
