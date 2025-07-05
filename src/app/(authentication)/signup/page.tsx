// app/test/page.tsx

import { getCandidateList } from "../_Actions/getUser";

export default async function TestPage() {
  const { candidates } = await getCandidateList();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Candidate List</h2>
      <ul className="space-y-2">
        {candidates.map((c) => (
          <li key={c.uuid} className="border p-2 rounded">
            <p>
              <strong>Name:</strong> {c.candidate_name}
            </p>
            <p>
              <strong>Job Title:</strong> {c.job_title}
            </p>
            <p>
              <strong>Status:</strong> {c.status}
            </p>
            <p>
              <strong>Sourced Date:</strong> {c.sourced_date}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
