import { Box, Button, ui } from "@adamjanicki/ui";
import { useState } from "react";
import type { ReactNode } from "react";
import PageWrapper from "src/components/PageWrapper";
import HelpButton from "src/games/common/HelpButton";
import { GeneralSettings, UseSettingsHook } from "src/games/common/settings";
import SettingsButton from "src/games/common/SettingsButton";
import { useMobile } from "src/hooks";
import { Children } from "src/types";

type Props<T> = {
  title: string;
  children: Children;
  requiresDesktop?: boolean;
  config: Config<T>;
};

export type Config<T> = {
  settings?: {
    useSettings: UseSettingsHook<T>;
    defaultSettings: T;
    labels: Record<string, string>;
  };
  help?: ReactNode;
  restartEligible?: boolean;
};

export default function GamePage<T extends GeneralSettings>({
  title,
  children,
  requiresDesktop,
  config,
}: Props<T>) {
  const isMobile = useMobile();
  const { help, settings, restartEligible } = config;
  const [key, setKey] = useState(0);
  return (
    <PageWrapper
      title={title}
      breadcrumbs={[
        { name: "Home", to: "/" },
        { name: "Games", to: "/games/" },
      ]}
    >
      {requiresDesktop && isMobile ? (
        <ui.p vfx={{ textAlign: "center", margin: "none" }}>
          Uh-oh!
          <ui.br />
          You need a bigger device to play this game.
        </ui.p>
      ) : (
        <Box key={key} vfx={{ axis: "y", gap: "s" }}>
          {children}
          {restartEligible && (
            <Box vfx={{ axis: "x", justify: "center", paddingTop: "s" }}>
              <Button onClick={() => setKey((key + 1) % 2)}>Restart</Button>
            </Box>
          )}
          {(help || settings) && (
            <Box
              vfx={{
                axis: "x",
                align: "center",
                justify: "end",
                gap: "s",
                paddingTop: "s",
              }}
            >
              {help && <HelpButton>{help}</HelpButton>}
              {settings && <SettingsButton {...settings} />}
            </Box>
          )}
        </Box>
      )}
    </PageWrapper>
  );
}
