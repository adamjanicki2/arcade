import { ui } from "@adamjanicki/ui";
import { useState } from "react";
import Modal from "src/components/Modal";
import SmallButton from "src/components/SmallButton";

type Props = {
  children: React.ReactNode;
};

export default function HelpButton({ children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SmallButton onClick={() => setOpen(!open)}>Help</SmallButton>
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
