import { sleep } from "@/lib/sleep";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: {params: any}) {

  console.log(request.nextUrl.searchParams)

  const uf = request.nextUrl.searchParams.get('uf');
  const city = request.nextUrl.searchParams.get('city')
  const search = request.nextUrl.searchParams.get('search')

  console.log('params', uf, city, search)

  const url = `https://viacep.com.br/ws/${uf}/${city}/${search}/json/`

  console.log('url', url)
  const result = await fetch(url);
  const data = await result.json();

  console.log(data)

  return NextResponse.json({ data })

}