import * as zod from "zod";

export const loginSchema = zod.object({
    email: zod
      .string()
      .nonempty("this field is required")
      .email("invalid email"),
    password: zod
      .string()
      .nonempty("this field is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Has minimum 8 characters, at least one uppercase, one lowercase, one digit, and one special character"
      ),
  })

export type loginSchemaType = zod.infer<typeof loginSchema>;