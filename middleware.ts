import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host");

  // لو الطلب جاي من www
  if (hostname === "www.egyptcollections.com") {
    url.hostname = "egyptcollections.com";

    // 301 Redirect دائم
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

// نطبّق التحويل على كل الصفحات
export const config = {
  matcher: "/:path*",
};
