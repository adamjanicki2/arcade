import { Button } from "@adamjanicki/ui";
import React, { useState } from "react";
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
  containerClassName?: string;
};

export type Config<T> = {
  settings?: {
    useSettings: UseSettingsHook<T>;
    defaultSettings: T;
    labels: Record<string, string>;
  };
  help?: React.ReactNode;
  restartEligible?: boolean;
};

export default function GamePage<T extends GeneralSettings>({
  title,
  children,
  requiresDesktop,
  config,
  containerClassName,
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
        <p className="tc">
          Uh-oh!
          <br />
          You need a bigger device to play this game.
        </p>
      ) : (
        <div key={key} className={containerClassName}>
          {children}
          {restartEligible && (
            <div className="flex justify-center mt2">
              <Button onClick={() => setKey((key + 1) % 2)}>Restart</Button>
            </div>
          )}
          {(help || settings) && (
            <div className="flex items-center justify-end mt2">
              {help && <HelpButton className="mr2">{help}</HelpButton>}
              {settings && <SettingsButton {...settings} />}
            </div>
          )}
        </div>
      )}
    </PageWrapper>
  );
}
