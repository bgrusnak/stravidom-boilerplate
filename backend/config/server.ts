export default ({ env }) => ({
  host: env('STRAPI_HOST', '0.0.0.0'),
  port: env.int('STRAPI_PORT', 1337),
  url: `http://localhost:${env('NGINX_PORT', '80')}/api`,
  app: {
    keys: env.array('APP_KEYS'),
  },
  proxy: true,
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
