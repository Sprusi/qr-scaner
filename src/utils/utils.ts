export const handleUrlClick = (url: string) => {
  let newUrl = url;
  if (!/^https?:\/\//i.test(url)) {
    newUrl = "https://" + url;
  }
  window.open(newUrl, "_blank");
};
