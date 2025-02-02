import React, { useState } from "react";
import Modal from "src/components/Modal";
import SmallButton from "src/components/SmallButton";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export default function HelpButton({ children, className }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SmallButton className={className} onClick={() => setOpen(!open)}>
        Help
      </SmallButton>
      {open && (
        <Modal
          title="Help"
          onClose={() => setOpen(false)}
          confirmText="OK"
          hideCancel
        >
          <p>{children}</p>
        </Modal>
      )}
    </>
  );
}
