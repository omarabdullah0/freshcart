import * as zod from "zod";

export const registerSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("this field is required")
      .min(2, "min 2 char")
      .max(10, "max 10 chars"),
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
    rePassword: zod.string().nonempty("this field is required"),
    phone: zod
      .string()
      .nonempty("this field is required")
      .regex(/^01[0125]\d{8}$/, "invalid phone number"),
  })
  .refine((data) => data.password === data.rePassword, {
  message: "passwords don't match",
  path: ["rePassword"],
});

export type registerSchemaType = zod.infer<typeof registerSchema>;