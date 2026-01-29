import { NextResponse } from "next/server";
import { pasteStore } from "@/app/lib/store";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const content = pasteStore.get(id);

  if (!content) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ content });
}