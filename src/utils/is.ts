export default {
  nullOrUndefined: (value: unknown): boolean => value === null || value === undefined,
  absoluteUrl: (url: string): boolean => /^(https?|file|ftps?|mailto|javascript|data:image\/[^;]{2,9};):/i.test(url),
  externalUrl: (url: string): boolean => {
    const getDomain = (address: string): string | undefined =>
      /(https?:\/\/)?((?:[\w\d-]+\.)+[\w\d]{2,})/i.exec(address)?.[2];

    return getDomain(window.location.href) !== getDomain(url);
  },
};
