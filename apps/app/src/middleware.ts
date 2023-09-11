import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/sign-in",
    verifyRequest: "/verify-request",
  },
});

export const config = {
  matcher: ["/todos", "/settings"],
};
