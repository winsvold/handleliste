/** @type {import('next').NextConfig} */
const config = {
  i18n: {
    locales: ["no"],
    defaultLocale: "no",
  },
  images: {
    domains: ["avatars.githubusercontent.com"],
    remotePatterns: [
      {
        hostname: "cdn.sanity.io",
      },
    ],
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  }
};

export default config;
