import { db } from "@/firebase/admin";
import { createFeedback } from "@/lib/actions/general.action";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // ✅ MUST await

    const body = await req.json();

    const result = await createFeedback({
      interviewId: id,   // now defined
      userId: body.userId,
      transcript: body.transcript,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Route error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const snapshot = await db
      .collection("feedback")
      .where("interviewId", "==", id)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return NextResponse.json({ success: false });
    }

    const doc = snapshot.docs[0];

    return NextResponse.json({
      success: true,
      feedback: doc.data(),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}