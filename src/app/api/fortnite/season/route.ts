import { NextResponse } from "next/server";
import { fortniteClient } from "@/lib/fortniteClient";

export async function GET() {
  try {
    const season = await fortniteClient.calendar.getCurrentSeason();
    return NextResponse.json(season);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
