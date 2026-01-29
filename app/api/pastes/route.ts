import { NextResponse } from "next/server";

import { nanoid } from "nanoid";
import { pasteStore } from "@/app/lib/store";

export async function POST(req: Request) {
  try {
    const { content } = await req.json();

    if (!content || content.trim() === "") {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const id = nanoid(6);

    // ✅ Save paste
    pasteStore.set(id, content);

    return NextResponse.json({ id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create paste" },
      { status: 500 }
    );
   }
}
