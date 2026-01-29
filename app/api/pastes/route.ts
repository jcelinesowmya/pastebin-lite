import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { nanoid } from "nanoid";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// CREATE PASTE
export async function POST(req: Request) {
  const { content } = await req.json();

  if (!content || content.trim() === "") {
    return NextResponse.json(
      { error: "Content is required" },
      { status: 400 }
    );
  }

  const id = nanoid(6);

  await redis.set(`paste:${id}`, content, {
    ex: 60 * 60 * 24, // 24 hours TTL
  });

  return NextResponse.json({
    id,
    url: `/p/${id}`,
  });
}

// READ PASTE
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID missing" }, { status: 400 });
  }

  const content = await redis.get(`paste:${id}`);

  if (!content) {
    return NextResponse.json(
      { error: "Paste not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ content });
}
