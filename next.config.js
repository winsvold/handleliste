const STUDIO_REWRITE = {
  source: "/cms/:path*",
  destination: process.env.NODE_ENV === "development" ? "http://localhost:3333/cms/:path*" : "/cms/index.html",
};

module.exports = {
  rewrites: () => [STUDIO_REWRITE],
  i18n: {
    locales: ["no"],
    defaultLocale: "no",
  },
  images: {
    domains: [
      "avatars.githubusercontent.com"
    ]
  }
};
