// src/app/jobpost/_components/JobCard.tsx
"use client";

import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Job } from "../(AppLayout)/jobpost/_types/jobposttypes";

type JobCardProps = {
  job: Job;
};

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const footer = (
    <div className="flex justify-between items-center pt-4 text-black">
      <Tag
        value={job.status}
        severity={job.status === "Open" ? "success" : "danger"}
        className="text-sm"
      />
      <Button
        label="View Details"
        icon="pi pi-arrow-right"
        className="p-button-sm p-button-outlined"
      />
    </div>
  );

  return (
    <>
      {job.status === "Closed" ? (
        <>
          <Card
            title={job.job_title}
            subTitle={`${job.department} • ${job.job_location}`}
            footer={footer}
            className={`shadow-md border rounded-md hover:shadow-lg transition duration-200 p-6 text-black border-t-4 border-[#f33939]`}
          >
            <div className="text-sm text-gray-700 space-y-2">
              <p>
                <strong>Type:</strong>{" "}
                <Tag value={job.job_type} severity="info" className="ml-1" />
              </p>
              <p>
                <strong>Experience:</strong> {job.work_experience}
              </p>
              <p>
                <strong>Salary:</strong>{" "}
                {job.exact_salary ??
                  job.starting_salary ??
                  job.maximum_salary ??
                  "Not specified"}
              </p>
              <p>
                <strong>Qualification:</strong> {job.minimum_qualification}
              </p>
            </div>
          </Card>
        </>
      ) : (
        <>
          <Card
            title={job.job_title}
            subTitle={`${job.department} • ${job.job_location}`}
            footer={footer}
            className={`shadow-md border rounded-md hover:shadow-lg transition duration-200 p-6 text-black border-t-4 border-[#7ff352]`}
          >
            <div className="text-sm text-gray-700 space-y-2">
              <p>
                <strong>Type:</strong>{" "}
                <Tag value={job.job_type} severity="info" className="ml-1" />
              </p>
              <p>
                <strong>Experience:</strong> {job.work_experience}
              </p>
              <p>
                <strong>Salary:</strong>{" "}
                {job.exact_salary ??
                  job.starting_salary ??
                  job.maximum_salary ??
                  "Not specified"}
              </p>
              <p>
                <strong>Qualification:</strong> {job.minimum_qualification}
              </p>
            </div>
          </Card>
        </>
      )}
    </>
  );
};

export default JobCard;
