import { httpBatchLink } from "@trpc/client";
import { appRouter } from "../../server/router";

export const api = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api/trpc",
    }),
  ],
});
