import CustomBreadcrumb from "@/app/components/_shared/CustomBreadcrumb";
import { getJobPosts } from "./actions/posts";
import JobPostsPageClient from "./JobPostsPageClient";
import { BreadCrumbsroutes } from "@/app/components/_shared/BreadCrumbRoutes";
import TableSearchInput from "@/app/components/_shared/TableSearchInput";

export default async function JobPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; per_page?: string; search?: string }>;
}) {
  const page = parseInt((await searchParams).page || "1");
  const perPage = parseInt((await searchParams).per_page || "10");
  const search = (await searchParams).search || "";

  const { data, meta } = await getJobPosts(page, perPage, search);

  return (
    <div className="p-6 bg-white">
      <CustomBreadcrumb Title="Welcome" items={BreadCrumbsroutes.jobpost} />
      <div className="relative mb-8">
        <div className="flex justify-center items-center relative pt-3">
          <h1 className="text-3xl font-bold text-gray-800">Available Jobs</h1>
          <div className="absolute right-0">
            <TableSearchInput value={search ?? ""} placeholder="Search" />
          </div>
        </div>
      </div>

      {data.length === 0 ? (
        <p className="text-center text-gray-500">No job postings available.</p>
      ) : (
        <JobPostsPageClient data={data} meta={meta} />
      )}
    </div>
  );
}
