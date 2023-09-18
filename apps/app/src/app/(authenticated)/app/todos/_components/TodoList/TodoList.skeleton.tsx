import { Flex, Skeleton } from "@playbook/ui";

export const TodoListLoading = () => (
  <Flex
    direction={"column"}
    className="border border-input rounded-md w-full divide-y"
  >
    <Skeleton className="h-[68px] w-full delay-0" />
    <Skeleton className="h-[68px] w-full rounded-none delay-75" />
    <Skeleton className="h-[68px] w-full rounded-none delay-100" />
    <Skeleton className="h-[68px] w-full rounded-none delay-125" />
    <Skeleton className="h-[68px] w-full rounded-none delay-150" />
    <Skeleton className="h-[68px] w-full rounded-none delay-200" />
    <Skeleton className="h-[68px] w-full rounded-none delay-300" />
    <Skeleton className="h-[68px] w-full rounded-none delay-500" />
  </Flex>
);
