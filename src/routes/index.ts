export const routes = {
  home: "#home",
  about: "#about",
  portfolio: "#portfolio",
  services: "#services",
  faq: "#faq",
  contact: "#contact",
} as const;

export type Route = (typeof routes)[keyof typeof routes];
