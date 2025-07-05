// types/candidate.ts

export type Candidate = {
  uuid: string;
  job_uuid: string;
  job_id: string;
  job_title: string;
  job_type: string;
  job_type_color: string | null;
  candidate_name: string;
  interview_round: string | null;
  recruiter_name: string | null;
  status: string;
  status_code: string;
  interview_status_description: string;
  schedule_uuid: string | null;
  resume: string | null;
  sourced_date: string;
  invited_date?: string;
  tagged_status: boolean;
};
