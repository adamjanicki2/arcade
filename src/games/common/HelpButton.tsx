import { Button, ui } from "@adamjanicki/ui";
import { useState } from "react";
import Modal from "src/components/Modal";

type Props = {
  children: React.ReactNode;
};

export default function HelpButton({ children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button size="small" onClick={() => setOpen(!open)}>
        Help
      </Button>
      {open && (
        <Modal
          title="Help"
          onClose={() => setOpen(false)}
          confirmText="OK"
          hideCancel
        >
          <ui.p vfx={{ margin: "none" }}>{children}</ui.p>
        </Modal>
      )}
    </>
  );
}
