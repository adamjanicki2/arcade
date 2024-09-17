import { Input, Select } from "@adamjanicki/ui";
import { useState } from "react";
import Field from "src/components/Field";
import Modal from "src/components/Modal";
import useSettings, { DEFAULT_SETTINGS } from "src/games/snake/useSettings";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function Settings({ open, setOpen }: Props) {
  const { settings, setSettings } = useSettings();
  const [currentSettings, setCurrentSettings] = useState(settings);
  const close = () => setOpen(false);
  return open ? (
    <Modal
      title="Settings"
      onConfirm={() => setSettings(currentSettings)}
      onClose={close}
    >
      <div className="flex flex-column">
        <Field title="Grid Size">
          <Input
            type="number"
            value={currentSettings.gridSize}
            onChange={(e) =>
              setCurrentSettings({
                ...currentSettings,
                gridSize: parseInt(e.target.value),
              })
            }
            placeholder={DEFAULT_SETTINGS.gridSize.toString()}
          />
        </Field>
        <Field title="FPS">
          <Input
            type="number"
            value={currentSettings.fps}
            onChange={(e) =>
              setCurrentSettings({
                ...currentSettings,
                fps: parseInt(e.target.value),
              })
            }
            placeholder={DEFAULT_SETTINGS.fps.toString()}
          />
        </Field>
        <Field title="Use Walls">
          <Select
            value={currentSettings.checkWalls ? "yes" : "no"}
            onChange={(e) =>
              setCurrentSettings({
                ...currentSettings,
                checkWalls: e.target.value === "yes",
              })
            }
            aria-label="Use Walls"
            options={["yes", "no"]}
          />
        </Field>
      </div>
    </Modal>
  ) : null;
}
