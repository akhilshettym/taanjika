import { z } from "zod";

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!%*$#?&]).{8,20}$/;

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, "First name is required.")
      .max(80, "Maximum 80 characters."),

    lastName: z.string().trim().min(1, "Last name is required.").max(80, "Maximum 80 characters."),

    email: z.string().trim().email("Enter a valid email address.").max(254),

    password: z
      .string()
      .min(8, "Password must contain at least 8 characters.")
      .max(20, "Password cannot exceed 20 characters.")
      .regex(passwordRegex, "Password does not meet all requirements."),

    confirmPassword: z.string().min(1, "Please re-enter your password."),

    accountIntent: z.enum(["COLLECTOR", "ARTIST"]),

    acceptedTerms: z
      .boolean()
      .refine(Boolean, { message: "You must accept the Terms and Conditions." }),

    acceptedPrivacyPolicy: z
      .boolean()
      .refine(Boolean, { message: "You must acknowledge the Privacy Policy." }),

    marketingOptIn: z.boolean(),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const signInSchema = z.object({
  email: z.string().trim().email("Enter a valid email address.").max(254),
  password: z.string().min(1, "Password is required."),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Enter a valid email address.").max(254),
});

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
