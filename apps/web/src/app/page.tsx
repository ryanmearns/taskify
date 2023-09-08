import { Button, ButtonIcon } from "@playbook/ui";
import { Boxes } from "lucide-react";

export default function Home() {
  return (
    <main className="border rounded lg:flex-row flex flex-col lg:h-screen">
      <Button>
        <ButtonIcon Icon={<Boxes />} orientation={"leading"} />
        Submit
      </Button>
    </main>
  );
}
