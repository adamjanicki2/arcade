import { Layer } from "@adamjanicki/ui";
import SmallButton from "src/components/SmallButton";

type Props = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  hideCancel?: boolean;
};

export default function Modal({
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "save",
  hideCancel,
}: Props) {
  const handleOk = () => {
    onConfirm?.();
    onClose();
  };
  return (
    <Layer onClose={onClose}>
      <div className="pa3 ba bw1 bg" style={{ maxWidth: "80%" }}>
        <h1 style={{ textDecoration: "underline" }}>{title}</h1>
        {children}
        <div className="flex items-center justify-end w-100 mt2">
          {!hideCancel && (
            <SmallButton className="mr2" onClick={onClose}>
              Cancel
            </SmallButton>
          )}
          <SmallButton onClick={handleOk}>{confirmText}</SmallButton>
        </div>
      </div>
    </Layer>
  );
}
