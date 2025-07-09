import { z } from "zod";

export const skillFormSchema = z.object({
  job_category_id: z
    .string()
    .min(1, { message: "This field is mandatory" })
    .refine((val) => !isNaN(Number(val)), {
      message: "Must be a valid number",
    }),

  skill_name: z
    .string()
    .min(1, { message: "This field is mandatory" })
    .refine(
      (val) =>
        val
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean).length > 0,
      {
        message: "Please enter at least one valid skill",
      },
    ),
});

export type SkillFormValues = z.infer<typeof skillFormSchema>;
