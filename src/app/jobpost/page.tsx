// src/app/jobpost/page.tsx

import React from "react";
import { getJobPosts } from "./actions/posts";
import { Job } from "./_types/jobposttypes";
import JobCard from "../components/JobCard";

export default async function JobPostsPage() {
  const jobs: Job[] = await getJobPosts();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Available Job Listings
      </h1>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">No job postings available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job: Job) => (
            <JobCard key={job.uuid} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
