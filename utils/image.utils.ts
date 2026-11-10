export const getUrl = (path: string) => {
  // https: — с http: CDN Contentful отвечает редиректом на каждый логотип
  return `https:${path}`;
};
