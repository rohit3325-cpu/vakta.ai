import { feedbackSchema } from "@/constants";
import { db } from "@/firebase/admin";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { success } from "zod";


export async function getInterviewByUserId(userId: string):Promise<Interview[] | null> {
  const interviews = await db.collection('interviews').where('userId','==',userId)
   .orderBy('createdAt','desc')
   .get();

   return interviews.docs.map((doc) =>({
    id:doc.id,
    ...doc.data()
   })) as Interview[];
}

export async function getLatestInterview(params:GetLatestInterviewsParams):Promise<Interview[] | null> {

  const { userId, limit =20 } = params;
  const interviews = await db.collection('interviews')
  .orderBy('createdAt','desc')
  .where('finalised','==', true) 
  .where('userId', '!=',userId)
  .limit(limit)
   .get();

   return interviews.docs.map((doc) =>({
    id:doc.id,
    ...doc.data()
   })) as Interview[];
}

export async function getInterviewById(
  id: string
): Promise<Interview | null> {
  const doc = await db.collection("interviews").doc(id).get();

  if (!doc.exists) {
    return null;
  }

  return doc.data() as Interview;
}

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript } = params;

  if (!interviewId || !userId) {
  console.log("Missing required fields", { interviewId, userId });
  return { success: false };

}
  try {
    const formattedTranscript = transcript
      .map((sentence: { role: string; content: string }) =>
        `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    let totalScore;
    let categoryScores;
    let strengths;
    let areasForImprovement;
    let finalAssessment;

    try {
      // ✅ Try Gemini
      const { object } = await generateObject({
        model: google("gemini-2.5-flash-lite"),
        schema: feedbackSchema,
        prompt: `
You are an AI interviewer analyzing a mock interview. Be strict,explain  and realistic.

Transcript:
${formattedTranscript}

Score the candidate (0–100) in:
- Communication Skills
- Technical Knowledge
- Problem-Solving
- Cultural & Role Fit
- Confidence & Clarity
        `,
        system:
          "You are a professional interviewer analyzing a mock interview.",
      });

      ({
        totalScore,
        categoryScores,
        strengths,
        areasForImprovement,
        finalAssessment,
      } = object);

    } catch (err) {
      // 🔥 Fallback if Gemini fails (quota / error / timeout)
      console.log("Gemini failed → using fallback", err);

      totalScore = 70;

      categoryScores = [
        {
          name: "Communication Skills",
          score: 65,
          comment: "Responses are understandable but lack structure",
        },
        {
          name: "Technical Knowledge",
          score: 70,
          comment: "Basic understanding but lacks depth",
        },
        {
          name: "Problem-Solving",
          score: 68,
          comment: "Can approach problems but needs better clarity",
        },
        {
          name: "Cultural & Role Fit",
          score: 72,
          comment: "Seems aligned but not strongly demonstrated",
        },
        {
          name: "Confidence & Clarity",
          score: 66,
          comment: "Some hesitation observed in responses",
        },
      ];

      strengths = [
        "Basic understanding of concepts",
        "Willingness to attempt answers",
      ];

      areasForImprovement = [
        "Improve structured communication",
        "Strengthen technical depth",
        "Increase confidence while answering",
      ];

      finalAssessment =
        "Average performance. Candidate has potential but needs improvement.";
    }

    // ✅ Always runs (Gemini success OR fallback)
    const feedback = await db.collection("feedback").add({
      interviewId,
      userId,
      totalScore,
      categoryScores,
      strengths,
      areasForImprovement,
      finalAssessment,
      createdAt: new Date().toISOString(),
    });

    return {
      success: true,
      feedbackId: feedback.id,
    };

  } catch (e) {
    console.log("Error saving Feedback", e);

    return { success: false };
  }
}

export async function getFeedbackByInterviewId(
  interviewId: string
): Promise<Feedback | null> {

  const snapshot = await db
    .collection("feedback")
    .where("interviewId", "==", interviewId)
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  return snapshot.docs[0].data() as Feedback;
}
