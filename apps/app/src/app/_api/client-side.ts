import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "../../server/router";

export const api = createTRPCReact<AppRouter>({});
