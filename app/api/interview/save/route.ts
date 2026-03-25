import { db } from "@/firebase/admin";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";

export async function POST(request: Request) {
  const { userId, messages, createdAt } = await request.json();

  try {

    // 🔥 EXTRACT METADATA USING AI
    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt: `
Extract the following details from this interview conversation:

- role
- experience level
- tech stack
- interview type

Return JSON only:

{
  "role": "",
  "level": "",
  "techstack": "",
  "type": ""
}

Conversation:
${JSON.stringify(messages)}
`
    });

    const cleaned = text.replace(/```json|```/g, "").trim();
    const meta = JSON.parse(cleaned);

    // 🔥 SAVE TO FIREBASE
    await db.collection("interviews").add({
      userId,
      role: meta.role,
      level: meta.level,
      techstack: meta.techstack,
      type: meta.type,
      transcript: messages,
      createdAt: createdAt || new Date().toISOString(),
      score: null,
      coverImage: getRandomInterviewCover(),
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error(error);
    return Response.json({ success: false }, { status: 500 });
  }
}