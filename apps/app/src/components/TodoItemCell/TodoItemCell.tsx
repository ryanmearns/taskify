"use server";

import { Cell } from "@/components/utils/cell";
import { getTenant } from "@/services/tenant";
import { getTodo } from "@/services/todos";
import { DashboardMain, DashboardMainHeader, Flex } from "@playbook/ui";
import { notFound } from "next/navigation";

const QUERY = async ({ uuid }: { uuid: string }) => {
  const { workspace } = await getTenant();

  return await getTodo({ uuid: uuid, workspaceUuid: workspace.uuid });
};

export async function TodoItemCell({ uuid }: { uuid: string }) {
  return (
    <Cell Failure={<Failure />} Loading={<Loading />}>
      <Data uuid={uuid} />
    </Cell>
  );
}
async function Data({ uuid }: { uuid: string }) {
  const data = await QUERY({ uuid });

  if (!data) {
    return <Empty />;
  }

  return <Success data={data} />;
}

const Loading = () => <div>Loading ...</div>;

const Failure = () => <div>Something went wrong</div>;

const Empty = () => notFound();

const Success = ({
  data,
}: {
  data: NonNullable<Awaited<ReturnType<typeof QUERY>>>;
}) => (
  <DashboardMain className="container">
    <DashboardMainHeader>
      <Flex direction={"column"} gap={"xs"}>
        <h1 className="text-xl font-semibold">{data.content}</h1>
      </Flex>
    </DashboardMainHeader>
  </DashboardMain>
);
