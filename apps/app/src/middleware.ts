import { withAuth } from "next-auth/middleware";

/**
 * Next auth middlware function to protect routes
 */
export default withAuth({
  pages: {
    signIn: "/sign-in",
    verifyRequest: "/verify-request",
  },
});

/**
 * Next auth middleware page matcher
 */
export const config = {
  matcher: ["/todos", "/settings"],
};
