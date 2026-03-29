import { getInterviewByUserId ,getFeedbackByInterviewId} from "@/lib/actions/general.action";
import Link from "next/link";


export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const interview = await getInterviewByUserId(id);
  const feedback = await getFeedbackByInterviewId(id);
console.log("interview:", interview);
  if (!feedback) {
    return <div className="text-white p-10">No feedback found</div>;
  }

  return (
  <div className="min-h-screen bg-transparent text-white flex items-center justify-center p-6">
    <div className="w-full max-w-4xl bg-[#111827] border border-gray-800 rounded-2xl p-8 shadow-2xl">

      {/* Header */}
      <h1 className="text-3xl font-semibold text-center">
        Feedback on the Interview
      </h1>

      

      <div className="flex justify-center gap-6 text-sm text-gray-400 mt-4">
        <span>
          ⭐ Overall Impression:
          <span className="text-white ml-2 font-semibold">
            {feedback.totalScore}/100
          </span>
        </span>

        <span>
          📅 {new Date(feedback.createdAt).toLocaleString()}
        </span>
      </div>

      {/* Divider */}
      <hr className="my-6 border-gray-700" />

      {/* Final Assessment */}
      <p className="text-gray-300 text-center mb-8 leading-relaxed">
        {feedback.finalAssessment}
      </p>

      {/* Breakdown */}
      <h2 className="text-xl font-semibold mb-4">
        Breakdown of Evaluation
      </h2>

      <div className="space-y-4">
        {feedback.categoryScores.map((cat: any, i: number) => (
          <div
            key={i}
            className="bg-[#1F2937] border border-gray-700 p-4 rounded-lg"
          >
            <h3 className="font-semibold">
              {i + 1}. {cat.name} ({cat.score}/100)
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              {cat.comment}
            </p>
          </div>
        ))}
      </div>

      {/* Strengths */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Strengths</h2>
        <ul className="list-disc pl-5 text-gray-300 space-y-1">
          {feedback.strengths.map((s: string, i: number) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      {/* Improvements */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">
          Areas for Improvement
        </h2>
        <ul className="list-disc pl-5 text-gray-300 space-y-1">
          {feedback.areasForImprovement.map((s: string, i: number) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      {/* Verdict */}
      <div className="mt-4 text-center">
  {feedback.totalScore >= 75 ? (
    <p className="text-green-400 text-sm">
      Great performance! You're ready for real interviews. Keep practicing to maintain consistency.
    </p>
  ) : feedback.totalScore >= 70 ? (
    <p className="text-yellow-400 text-sm">
      You're close! Improve a few areas to push your score above 75 for stronger recommendations.
    </p>
  ) : (
    <p className="text-red-400 text-sm">
      You are not recommended yet. Focus on improving your weak areas and aim for a score above 70–75.
    </p>
  )}
</div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-10">
  <Link
    href="/"
    className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
  >
    Back to Home
  </Link>

  <Link
    href="/interview"
    className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition"
  >
    Back to Interviews
  </Link>
</div>

    </div>
  </div>
);
}