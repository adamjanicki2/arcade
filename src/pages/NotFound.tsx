import { ui } from "@adamjanicki/ui";
import Link from "src/components/Link";
import PageWrapper from "src/components/PageWrapper";

export default function NotFound() {
  return (
    <PageWrapper title="404" breadcrumbs={[{ name: "Home", to: "/" }]}>
      <ui.p vfx={{ textAlign: "center", margin: "none" }}>
        Oops! The requested page does not exist.
        <ui.br />
        Try going <Link to="/">home</Link>.
      </ui.p>
    </PageWrapper>
  );
}
