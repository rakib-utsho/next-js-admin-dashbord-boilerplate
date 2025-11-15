/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { cookies } from "next/headers";

// export async function middleware(request: NextRequest) {
//   const cookieStore = await cookies();
//   const token: any = cookieStore.get("token");
//   const currentPath = request.nextUrl.pathname;

//   // If user already logged in and tries to access login page, redirect to dashboard
//   if (currentPath === "/" && token) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   // Allow access to login page without authentication if no token
//   if (currentPath === "/" && !token) {
//     return NextResponse.next();
//   }

//   // Redirect to login if token is not present
//   if (!token) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   return NextResponse.next();
// }

// // "Matching Paths"
// export const config = {
//   matcher: [
//     "/((?!login|forget-password|otp-verify|set-new-password|_next|api).*)",
//   ],
// };

 
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Do nothing — allow every request
  return NextResponse.next();
}

// "Matching Paths"
export const config = {
  matcher: ["/((?!_next|api).*)"], // or even just: ["/"]
};
