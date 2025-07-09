"use client";

import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CategoryOption,
  getSkillCategories,
  postTestSkill,
} from "../actions/posts";
import { CustomResponse } from "@/app/(AppLayout)/products/types";
import {
  skillFormSchema,
  SkillFormValues,
} from "../_Validation/validation/skillSchema";

type SkillResponse = {
  id: number;
  job_category_id: number;
  skill_name: string[];
};

export default function SkillTestForm() {
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [result, setResult] = useState<CustomResponse<SkillResponse> | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SkillFormValues>({
    resolver: zodResolver(skillFormSchema),
    mode: "onBlur",
    defaultValues: {
      job_category_id: "",
      skill_name: "",
    },
  });

  useEffect(() => {
    getSkillCategories().then(setCategories);
  }, []);

  const onSubmit = async (data: SkillFormValues) => {
    const payload = {
      job_category_id: parseInt(data.job_category_id),
      skill_name: data.skill_name.split(",").map((s: string) => s.trim()),
    };

    const res = await postTestSkill(payload);
    setResult(res);
  };

  return (
    <Box component={Paper} sx={{ p: 4, maxWidth: 500, mx: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Test Skill POST
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box mb={2}>
          <TextField
            select
            fullWidth
            label="Job Category"
            {...register("job_category_id")}
            error={!!errors.job_category_id}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "999px",
              },
            }}
          >
            <MenuItem value="" disabled>
              Select a category
            </MenuItem>

            {categories.map((cat) => (
              <MenuItem key={cat.value} value={String(cat.value)}>
                {cat.label}
              </MenuItem>
            ))}
          </TextField>

          <Box sx={{ height: "30px", mt: 0.5 }}>
            <Typography
              fontSize="0.75rem"
              color={errors.job_category_id ? "error.main" : "transparent"}
            >
              {errors.job_category_id?.message ?? "placeholder"}
            </Typography>
          </Box>
        </Box>

        <Box mb={2}>
          <TextField
            fullWidth
            label="Skill Names (comma separated)"
            {...register("skill_name")}
            error={!!errors.skill_name}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "999px",
              },
            }}
          />

          <Box sx={{ height: "30px", mt: 0.5 }}>
            <Typography
              fontSize="0.75rem"
              color={errors.skill_name ? "error.main" : "transparent"}
            >
              {errors.skill_name?.message ?? "placeholder"}
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>

      {result && (
        <Box mt={4}>
          <Typography variant="subtitle1">Response:</Typography>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </Box>
      )}
    </Box>
  );
}
