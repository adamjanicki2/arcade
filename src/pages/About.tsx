import { ui } from "@adamjanicki/ui";
import Logo from "src/components/Logo";
import PageWrapper from "src/components/PageWrapper";

export default function About() {
  return (
    <PageWrapper title="About" breadcrumbs={[{ name: "Home", to: "/" }]}>
      <ui.p className="w-70-90" vfx={{ margin: "none" }}>
        I originally had the idea for this site all the way back in 2018 when I
        was writing my first few lines of JavaScript. Back then, I was designing
        simple games using the HTML canvas element, and to be honest, they were
        pretty bad (coding wise). I had an idea to make one central site to
        house each of my games, but it never came to fruition until now.
        <ui.br />
        <ui.br />
        This site contains a few fun games, but I'm planning on adding more
        whenever I think of one. The beauty of making one arcade site instead of
        one site per game is that it's easy to tinker and add games: I don't
        have to go through the whole setup process involves with provisioning a
        new site; I just have to add a few new files to this site and we're all
        set!
        <ui.br />
        <ui.br />
        The game catalog is mainly meant to be JS ports of classic 8-bit style
        games both from Atari and arcade machines alike. In addition, I'll have
        a few classic web games like Snake and others. We'll see how many I can
        add eventually; I'm shooting for over 10! But for now, enjoy the first
        few knowing more are on the way. Have fun!
        <ui.br />
        <ui.br />
        THANKS,
        <ui.br />
        ADAM
        <ui.br />
        (9/15/2024)
        <ui.br />
        <ui.span vfx={{ marginTop: "s" }}>
          <Logo width="3em" />
        </ui.span>
      </ui.p>
    </PageWrapper>
  );
}
