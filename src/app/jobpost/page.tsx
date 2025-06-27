import { getJobPosts } from "./actions/posts";
import JobPostsPageClient from "./JobPostsPageClient";

export default async function JobPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const page = parseInt((await searchParams).page || "1");
  const { data, meta } = await getJobPosts(page);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
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
