import React from "react";
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
  titleClass?: string;
  breadcrumbs: Breadcrumb[];
};

const PageWrapper = ({
  children,
  title,
  documentTitle,
  titleClass = "",
  breadcrumbs,
}: Props) => {
  useDocumentTitle(`${documentTitle ?? title}`);

  return (
    <div
      className="flex flex-column items-center w-100 pb3"
      style={{ minHeight: "70vh" }}
    >
      <div
        className="flex items-center w-100 ph4 mt3"
        style={{ whiteSpace: "pre-wrap" }}
      >
        {breadcrumbs.map(({ name, to }) => (
          <React.Fragment key={name}>
            <Link to={to}>{name}</Link>
            <span className="mh2">{">"}</span>
          </React.Fragment>
        ))}
        {title}
      </div>
      <h1 className={`page-title-text tc ${titleClass}`}>
        {title.toUpperCase()}
      </h1>
      {children}
    </div>
  );
};

export default PageWrapper;
