import * as z from "zod";
import { signUpSchema } from "@/validator/schema";
export async function createUser(data: z.infer<typeof signUpSchema>) {
  const result = signUpSchema.safeParse(data);
  if (!result.success) {
    throw new Error("Invalid input");
  }
}
