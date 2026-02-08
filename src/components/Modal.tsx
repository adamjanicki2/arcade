import { Box, Button, Layer, ui } from "@adamjanicki/ui";

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
      <Box
        vfx={{
          axis: "y",
          gap: "m",
          padding: "m",
          border: true,
          backgroundColor: "default",
        }}
        style={{ maxWidth: "80%" }}
      >
        <ui.h1 vfx={{ margin: "none" }} style={{ textDecoration: "underline" }}>
          {title}
        </ui.h1>
        {children}
        <Box
          vfx={{
            axis: "x",
            align: "center",
            justify: "end",
            width: "full",
            gap: "s",
          }}
        >
          {!hideCancel && (
            <Button size="small" onClick={onClose}>
              Cancel
            </Button>
          )}
          <Button size="small" onClick={handleOk}>
            {confirmText}
          </Button>
        </Box>
      </Box>
    </Layer>
  );
}
