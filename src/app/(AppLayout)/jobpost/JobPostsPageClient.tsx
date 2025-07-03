"use client";

import JobCard from "@/app/components/JobCard";
import { Job } from "./_types/jobposttypes";
import { Meta } from "./actions/posts";
import CustomPaginator from "@/app/components/_shared/CustomPaginator";

type Props = {
  data: Job[];
  meta: Meta;
};

export default function JobPostsPageClient({ data, meta }: Props) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {data.map((job) => (
          <JobCard key={job.uuid} job={job} />
        ))}
      </div>

      <CustomPaginator meta={meta} />
    </>
  );
}
