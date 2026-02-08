import { Box, ui } from "@adamjanicki/ui";
import Link from "src/components/Link";
import { useDocumentTitle } from "src/hooks";
import type { Children } from "src/types";

type Breadcrumb = {
  name: string;
  to: string;
};

type Props = {
  children: Children;
  title: string;
  documentTitle?: string;
  breadcrumbs: Breadcrumb[];
};

export default function PageWrapper({
  children,
  title,
  documentTitle,
  breadcrumbs,
}: Props) {
  useDocumentTitle(`${documentTitle ?? title}`);

  return (
    <Box
      vfx={{
        axis: "y",
        align: "center",
        width: "full",
        paddingBottom: "xl",
        gap: "m",
      }}
      style={{ minHeight: "70vh" }}
    >
      <Box
        vfx={{
          axis: "x",
          align: "center",
          width: "full",
          paddingX: "l",
          gap: "s",
        }}
        style={{ whiteSpace: "pre-wrap" }}
      >
        {breadcrumbs.map(({ name, to }) => (
          <ui.span key={name} vfx={{ axis: "x", align: "center", gap: "s" }}>
            <Link to={to}>{name}</Link>
            <ui.span>{">"}</ui.span>
          </ui.span>
        ))}
        <ui.span>{title}</ui.span>
      </Box>
      <ui.h1 className="page-title-text" vfx={{ textAlign: "center", margin: "none" }}>
        {title.toUpperCase()}
      </ui.h1>
      {children}
    </Box>
  );
}
