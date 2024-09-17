import PageWrapper from "src/components/PageWrapper";
import { useMobile } from "src/hooks";
import { Children } from "src/types";

type Props = {
  title: string;
  children: Children;
  requiresDesktop?: boolean;
};

export default function GamePage({ title, children, requiresDesktop }: Props) {
  const isMobile = useMobile();
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
        children
      )}
    </PageWrapper>
  );
}
