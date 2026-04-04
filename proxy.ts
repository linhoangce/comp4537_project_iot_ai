// frontend/proxy.ts
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let all requests pass through without calling the backend here
  return NextResponse.next();
}