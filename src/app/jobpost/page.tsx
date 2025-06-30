import { BreadCrumbsroutes } from "../components/_shared/BreadCrumbRoutes";
import CustomBreadcrumb from "../components/_shared/CustomBreadcrumb";
import { getJobPosts } from "./actions/posts";
import JobPostsPageClient from "./JobPostsPageClient";

export default async function JobPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; per_page?: string }>;
}) {
  const page = parseInt((await searchParams).page || "1");
  const perPage = parseInt((await searchParams).per_page || "10");

  const { data, meta } = await getJobPosts(page, perPage);

  return (
    <div className="p-6 bg-gray-50">
      <CustomBreadcrumb Title="Welcome" items={BreadCrumbsroutes.jobpost} />
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Available Jobs
      </h1>
      {data.length === 0 ? (
        <p className="text-center text-gray-500">No job postings available.</p>
      ) : (
        <JobPostsPageClient data={data} meta={meta} />
      )}
    </div>
  );
}
