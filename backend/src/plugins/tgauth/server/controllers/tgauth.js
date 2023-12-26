"use strict";

module.exports = {
  async validate(ctx) {
    try {
      return await strapi
        .plugin("tgauth")
        .service("tgauth")
        .validate(ctx.request.body);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async agree(ctx) {
    try {
      return await strapi.plugin("tgauth").service("tgauth").agree(ctx);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};
