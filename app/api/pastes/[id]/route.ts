import { NextResponse } from "next/server";
import { pasteStore } from "@/app/lib/store";

interface Params {
  id: string;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<Params> }
) {
  const { id } = await params; // ✅ MUST await

  const content = pasteStore.get(id);

  if (!content) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ content });
  }