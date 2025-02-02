import React from "react";
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
  help?: React.ReactNode;
};

export default function GamePage<T extends GeneralSettings>({
  title,
  children,
  requiresDesktop,
  config,
}: Props<T>) {
  const isMobile = useMobile();
  const { help, settings } = config;
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
        <div>
          {children}
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
