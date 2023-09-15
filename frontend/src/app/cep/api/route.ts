import { sleep } from "@/lib/sleep";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await sleep(3000)
  const uf = request.nextUrl.searchParams.get('uf');
  const city = request.nextUrl.searchParams.get('city')
  const search = request.nextUrl.searchParams.get('search')

  const url = `https://viacep.com.br/ws/${uf}/${city}/${search}/json/`

  const result = await fetch(url);
  const data = await result.json();

  return NextResponse.json({ data })
}