import { useEffect } from "react";

export const useTitle = (title: string) => {
  useEffect(() => {
    const newTitle = title;
    const prevTitle = document.title;
    document.title = newTitle;
    return () => {
      document.title = prevTitle;
    };
  }, []);
};
