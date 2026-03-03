import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://fortnite-api.com/v2/shop?language=pt-BR", {
      next: { revalidate: 3600 }, // Cache por 1 hora
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch shop: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
