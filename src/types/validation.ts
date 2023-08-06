import { z } from "zod";
import { LoginSchema, RegisterSchema } from "../validation/schemas";

export type RegisterState = z.infer<typeof RegisterSchema>;
export type LoginState = z.infer<typeof LoginSchema>;