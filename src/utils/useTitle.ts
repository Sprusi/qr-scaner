import { useEffect } from "react";
import { InterfaceLabels } from "../constants";

export const useTitle = (title: string, isPrefix = true) => {
  useEffect(() => {
    const newTitle = !isPrefix
      ? title
      : `${title} - ${InterfaceLabels.TITLE_PREFIX}`;
    const prevTitle = document.title;
    document.title = newTitle;
    return () => {
      document.title = prevTitle;
    };
  }, []);
};
