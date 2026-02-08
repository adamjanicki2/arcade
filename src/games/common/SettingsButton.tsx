import React from "react";
import { Box, Input, Select } from "@adamjanicki/ui";
import { useState } from "react";
import Field from "src/components/Field";
import Modal from "src/components/Modal";
import SmallButton from "src/components/SmallButton";
import type {
  GeneralSettings,
  UseSettingsHook,
} from "src/games/common/settings";

type Props<T> = {
  defaultSettings: T;
  useSettings: UseSettingsHook<T>;
  labels: Record<string, string>;
};

export default function SettingsButton<T extends GeneralSettings>({
  useSettings,
  labels,
  defaultSettings,
}: Props<T>) {
  const { settings, setSettings } = useSettings();
  const [currentSettings, setCurrentSettings] = useState<T>(settings);
  const [open, setOpen] = useState(false);

  return (
    <>
      <SmallButton onClick={() => setOpen(!open)}>Settings</SmallButton>
      {open && (
        <Modal
          title="Settings"
          onConfirm={() => setSettings(currentSettings)}
          onClose={() => setOpen(false)}
        >
          <Box vfx={{ axis: "y", gap: "s" }}>
            {Object.entries(currentSettings).map(
              ([settingsKey, settingsValue], i) => (
                <Field title={labels[settingsKey]} key={i}>
                  <CustomInput
                    label={labels[settingsKey]}
                    settingsValue={settingsValue as any}
                    defaultValue={defaultSettings[settingsKey] as any}
                    onChange={(value: T) =>
                      setCurrentSettings({
                        ...currentSettings,
                        [settingsKey]: value,
                      })
                    }
                  />
                </Field>
              ),
            )}
          </Box>
        </Modal>
      )}
    </>
  );
}

type CustomInputProps<T> = {
  label: string;
  settingsValue: T;
  defaultValue: T;
  onChange: (value: T) => void;
};

function CustomInput<T>({
  label,
  settingsValue,
  onChange,
  defaultValue,
}: CustomInputProps<T>): React.JSX.Element {
  const fieldType = typeof settingsValue;
  switch (fieldType) {
    case "number":
      return (
        <Input
          type="number"
          value={settingsValue as number}
          onChange={(e) => onChange(parseInt(e.target.value) as T)}
          placeholder={(defaultValue as any).toString()}
        />
      );
    case "boolean":
      return (
        <Select
          value={settingsValue ? "yes" : "no"}
          onSelect={(value) => onChange((value === "yes") as T)}
          aria-label={label}
          options={["yes", "no"]}
        />
      );
    default:
      throw new Error("Unexpected field type");
  }
}
