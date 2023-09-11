import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/sign-in",
    verifyRequest: "/verify-request",
  },
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - static (static files)
     * - favicon.ico (favicon file)
     * - /
     */
    "/((?!||api|static|sign-in|verifiy-request|favicon.ico).*)",
  ],
};
