import { getRandomInterviewCover } from '@/lib/utils';
import dayjs from 'dayjs'
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import DisplayTechIcons from './DisplayTechIcons';


const Interviewcard = ({id, userId,role,type,techstack,
    createdAt}: InterviewCardProps) => {
          const feedback = null as Feedback | null;
          const normalisedType = /mix/gi.test(type) ? 'Mixed' : type;
          const formattedDate = dayjs(feedback?.createdAt ||createdAt
            || Date.now()).format('MMM D,YYYY')
  return (
    <div className="card-border w-full max-w-[360px] min-h-96">
          <div className='card-interview bg-black'>
               <div >
                 <div className='absolute top-0 right-0 w-fit px-4
                  py-2 rounded-bl-lg bg-light-600'>
                <p className='badge-text'>{normalisedType}</p>
                </div> 

                <Image src={getRandomInterviewCover()} alt='cover image'
                  width={80} height={80} className="rounded-full object-cover w-16 h-16 sm:w-20 sm:h-20"/>

                  <h4 className='mt-5 capitalize'>
                       {role} Interview
                  </h4>

                  <div className='flex flex-row gap-5 mt-3 '>
                    <div className='flex flex-row gap-2'>
                             <Image src="/calendar.svg" alt='calender' width={22} height={22}/>
                             <p>{formattedDate}</p>
                    </div>
                     <div className='flex flex-row gap-2 items-center'>
                         <Image src="/star.svg" alt='star' width={22} height={22} />
                         <p>{feedback?.totalScore || '---'}/100</p>
                     </div>
                  </div>

                  <p className='line-clamp-2 mt-5'>
                        {feedback?.finalAssessment || "you haven't taken the interview yet.Take it now to improve your skills."}
                  </p>
               </div>
               <div className='flex flex-row justify-between'>
                     <DisplayTechIcons techStack={techstack} />

                     <Button className="btn-primary" >
                           <Link href={feedback
                              ? `/interview/${id}/feedback`
                              :`/interview/${id}`
                           }>
                               {feedback ? 'check Feedback':'view Interview'}
                           </Link>
                     </Button>
               </div>
            </div> 
              
    </div>
  )
}

export default Interviewcard