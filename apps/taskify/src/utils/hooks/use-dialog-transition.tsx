import * as React from "react";

export function useDialogTranisition({
  isPending,
  onClose,
}: {
  isPending: boolean;
  onClose?: () => void;
}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!isPending) {
      setOpen(false);
      onClose && onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  return { open, setOpen };
}
