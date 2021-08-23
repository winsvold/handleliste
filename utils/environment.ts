const environment = process.env.NODE_ENV;

export const isProduction = () => {
  return environment === "production";
};

export function isTest(): boolean {
  return environment === "test";
}

export function isDevelopment(): boolean {
  return environment === "development";
}
