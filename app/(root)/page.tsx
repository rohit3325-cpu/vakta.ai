import Interviewcard from '@/components/Interviewcard'
import { Button } from '@/components/ui/button'
import { getCurrentUser } from '@/lib/actions/auth.action'
import { getInterviewByUserId, getLatestInterview } from '@/lib/actions/general.action'
import Image from 'next/image'
import Link from 'next/link'

const Page = async () => {
  const user = await getCurrentUser();

  const [userInterview, latestInterviews] = await Promise.all([
    getInterviewByUserId(user?.id!),
    getLatestInterview({ userId: user?.id! }),
  ]);

  const interviews = userInterview || [];

  const averageScore =
    interviews.length > 0
      ? Math.round(
          interviews.reduce(
            (acc: number, item: any) => acc + (item.totalScore || 0),
            0
          ) / interviews.length
        )
      : 0;

  const recommendedCount =
    interviews.filter((i: any) => (i.totalScore || 0) >= 70).length;

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.name || "User"} 👋
          </h1>
          <p className="text-muted-foreground">
            Track your interview performance & improve with AI
          </p>
        </div>

        <Button asChild className="btn-primary">
          <Link href="/interview">+ New Interview</Link>
        </Button>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-sm">Total Interviews</p>
          <h3 className="text-3xl font-semibold mt-2">
            {interviews.length}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Lifetime completed
          </p>
        </div>

        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-sm">Average Score</p>
          <h3 className="text-3xl font-semibold mt-2">
            {averageScore || "--"}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Across all interviews
          </p>
        </div>

        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-sm">Recommended</p>
          <h3 className="text-3xl font-semibold text-green-400 mt-2">
            {recommendedCount}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Strong performances
          </p>
        </div>
      </section>

      {/* AI Coach Banner */}
     <section className="card-cta flex flex-col items-center gap-8 lg:flex-row lg:justify-between 
px-6 py-12 md:px-10 md:py-16 lg:py-20 rounded-2xl">

  <div className="space-y-6 max-w-xl">
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-title">
      Your AI Interview Coach
    </h2>

    <p className="text-muted-foreground md:text-lg">
      Practice mock interviews, receive instant feedback,
      and improve your confidence using AI-driven analysis.
    </p>

    <Button asChild size="lg" className="btn-primary">
      <Link href="/interview">
        Start Practicing
      </Link>
    </Button>
  </div>

  <Image
    src="/robot.png"
    alt="robot"
    width={500}
    height={500}
    className="w-[260px] sm:w-[340px] md:w-[420px] lg:w-[520px] h-auto"
    priority
  />
</section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/interview">
            <div className="dashboard-card">
              🎤 Start Interview
            </div>
          </Link>

          <Link href="/resume">
            <div className="dashboard-card">
              📄 Build Resume
            </div>
          </Link>

          <Link href="/analytics">
            <div className="dashboard-card">
              📊 View Analytics
            </div>
          </Link>
        </div>
      </section>

      {/* Past Interviews */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold">
          Your Past Interviews
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviews.length > 0 ? (
            interviews.map((interview) => (
              <Interviewcard
                key={interview.id}
                {...interview}
              />
            ))
          ) : (
            <p className="text-muted-foreground">
              You haven't taken any interviews yet
            </p>
          )}
        </div>
      </section>

      {/* Recommended Interviews */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold">
          Pick Your Interview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestInterviews?.length > 0 ? (
            latestInterviews.map((interview) => (
              <Interviewcard
                key={interview.id}
                {...interview}
              />
            ))
          ) : (
            <p className="text-muted-foreground">
              No interviews available.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Page;