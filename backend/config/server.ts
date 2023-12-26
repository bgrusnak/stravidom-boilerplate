export default ({ env }) => ({
  host: env("STRAPI_HOST", "0.0.0.0"),
  port: env.int("STRAPI_PORT", 1337),
  url: env("STRAPI_ADMIN_BACKEND_URL", "/api"),
  app: {
    keys: env.array("APP_KEYS", [
      "hH0ezhndaLKxnHF3tQJDyQ==",
      "It8v7Eb6J9Ye4eOzKTw8IQ==",
      "hSKODqYv7G+JIpQrv8Szdw==",
      "NXvHtNpe7fdeIvDe7I/V5Q==",
    ]),
  },
  proxy: true,
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
  logger: {
    level: "debug",
  },
});
