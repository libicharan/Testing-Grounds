// src/app/jobpost/_types/jobposttypes.ts

export type Job = {
  uuid: string;
  job_id: string;
  job_title: string;
  job_type: string;
  job_type_color: string | null;
  job_category: string;
  department: string;
  designation: string;
  number_of_vacancies: number;
  closing_date: string;
  minimum_qualification: string;
  preferred_qualification: string | null;
  gender_preference: string;
  job_location: string;
  about_job: string | null;
  responsibilities: string | null;
  priority_of_sourcing: string;
  work_experience: string;
  pay_by: string;
  rate: string;
  starting_salary: string | null;
  maximum_salary: string | null;
  exact_salary: string | null;
  show_company_details: boolean;
  date_posted: string;
  company_name: string;
  profile: string;
  status: string;
  required_skillset: string[];
};

export type PaginationMeta = {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
};
