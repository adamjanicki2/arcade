import { useEffect } from "react";

const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = title.toUpperCase();
  }, [title]);
};

export default useDocumentTitle;
