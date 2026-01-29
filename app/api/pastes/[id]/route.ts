import { NextResponse } from "next/server";
import { pasteStore } from "@/app/lib/store";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // ✅ FIX

  const content = pasteStore.get(id);

  if (!content) {
    return NextResponse.json(
      { error: "Paste not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ content }, { status: 200 });
}
