import { NextRequest, NextResponse } from "next/server";
import { Role } from "./constants/roles";
import { userServices } from "./services/user.service";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let isAuthenticated = false;
  let isAdmin = false;
  let isSeller = false;

  const { data } = await userServices.getsession();

  if (data) {
    isAuthenticated = true;
    isAdmin = data.user.role === Role.admin;
    isSeller = data.user.role === Role.seller;
  }

  //  Not authenticated
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //  Admin user
  else if (isAdmin) {
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(
        new URL("/admin-dashboard", request.url)
      );
    }
  }

  //  Seller user
  else if (isSeller) {
    if (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/admin-dashboard")
    ) {
      return NextResponse.redirect(
        new URL("/seller-dashboard", request.url)
      );
    }
  }

  //  Normal user
  else {
    if (
      pathname.startsWith("/admin-dashboard") ||
      pathname.startsWith("/seller-dashboard")
    ) {
      return NextResponse.redirect(
        new URL("/dashboard", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin-dashboard/:path*",
    "/seller-dashboard/:path*",
  ],
};
