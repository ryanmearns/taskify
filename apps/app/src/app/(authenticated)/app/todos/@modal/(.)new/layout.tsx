import { DialogSegment, DialogSegmentContent } from "@playbook/ui";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DialogSegment>
      <DialogSegmentContent>{children}</DialogSegmentContent>
    </DialogSegment>
  );
}
