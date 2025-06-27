import { NextResponse } from "next/server";

export async function GET() {
  try {
    const dates = await fetchAvailableDates();
    return NextResponse.json(dates);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export type AvailableDatesResponse = {
  date: string;
  "stop-and-search": string[];
};

async function fetchAvailableDates(): Promise<AvailableDatesResponse[]> {
  const uri = `${process.env.POLICE_API}/crimes-street-dates`;

  try {
    const response = await fetch(uri);
    return (await response.json()) as AvailableDatesResponse[];
  } catch (e) {
    console.error(
      `Failed to fetch available dates at uri ${uri}, original error: `,
      e
    );
  }
  return [];
}
