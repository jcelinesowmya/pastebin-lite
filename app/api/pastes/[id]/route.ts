import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "ID not provided" }, { status: 400 });
  }

  try {
    // TODO: Replace this with DB logic if needed
    return NextResponse.json(
      { content: {} },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch paste" },
      { status: 500 }
    );
  }
}
