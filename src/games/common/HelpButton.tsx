import { Button, ui } from "@adamjanicki/ui";
import Modal from "src/components/Modal";
import { useModalButton } from "src/hooks";

type Props = {
  children: React.ReactNode;
};

export default function HelpButton({ children }: Props) {
  const { isOpen, toggle, close } = useModalButton();

  return (
    <>
      <Button size="small" onClick={toggle}>
        Help
      </Button>
      {isOpen && (
        <Modal title="Help" onClose={close} confirmText="OK" hideCancel>
          <ui.p vfx={{ margin: "none" }}>{children}</ui.p>
        </Modal>
      )}
    </>
  );
}
