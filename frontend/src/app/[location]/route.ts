import { NextResponse } from "next/server";
import { Context } from "vm";

export async function GET(request: Request, context: Context) {
  const location = context.params.location;

  const url = `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${location}&aqi=no&lang=pt`

  const result = await fetch(url);
  const data = await result.json();

  console.log(data)

  return NextResponse.json({ data })

}