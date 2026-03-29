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

  const hasPastInterviews = userInterview?.length > 0;
  const hasUpcomingInterviews = latestInterviews?.length > 0;

  // stats calculation
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
    <>
      {/* hero */}
      <section className="card-cta flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
        <div className="space-y-6 text-center lg:text-left">
          <div className="space-y-6 mx-auto lg:mx-0">
            <h1 className="text-4xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title animate-gradient">
              Meet Your AI Coach
            </h1>

            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl lg:mx-0">
              Elevate your journey with AI-powered career coaching.
              Personalized. Precise. Progress-focused.
            </p>

            <Button asChild className="btn-primary max-sm:w-full">
              <Link href="/interview">Start an Interview</Link>
            </Button>
          </div>
        </div>

        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="w-[220px] sm:w-[300px] lg:w-[400px] h-auto"
        />
      </section>

      {/* stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-sm">Total Interviews</p>
          <h3 className="text-2xl font-semibold mt-1">
            {interviews.length}
          </h3>
        </div>

        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-sm">Average Score</p>
          <h3 className="text-2xl font-semibold mt-1">
            {averageScore || "--"}
          </h3>
        </div>

        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-sm">Recommended</p>
          <h3 className="text-2xl font-semibold text-green-400 mt-1">
            {recommendedCount}
          </h3>
        </div>
      </div>

      

      {/* past interview */}
      <section className='flex flex-col gap-6 mt-8'>
        <h2>Your Past Interviews</h2>

        <div className="interviews-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {hasPastInterviews ? (
            userInterview?.map((interview) => (
              <Interviewcard
                key={interview.id}
                {...interview}
              />
            ))
          ) : (
            <p>You haven't taken any interviews yet</p>
          )}
        </div>
      </section>

      {/* next interview */}
      <section className='flex flex-col gap-6 mt-8'>
        <h2>Pick Your Interview</h2>

        <div className="interviews-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <Interviewcard
                key={interview.id}
                {...interview}
              />
            ))
          ) : (
            <p>There are no new interviews available.</p>
          )}
        </div>
      </section>
    </>
  )
}

export default Page