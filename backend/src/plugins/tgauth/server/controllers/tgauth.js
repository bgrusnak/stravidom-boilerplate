"use strict";

module.exports = {
  async validate(ctx) {
    try {
   return await strapi
   .plugin("tgauth")
   .service("tgauth")
   .validate(ctx.request.url);
    } catch (err) {
      ctx.throw(500, err);
    } 
  },
  async find(ctx) {
    try {
      return await strapi.plugin("tgauth").service("tgauth").find(ctx.query);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async delete(ctx) {
    try {
      ctx.body = await strapi
        .plugin("tgauth")
        .service("tgauth")
        .delete(ctx.params.id);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async create(ctx) {
    try {
      ctx.body = await strapi
        .plugin("tgauth")
        .service("tgauth")
        .create(ctx.request.body);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async update(ctx) {
    try {
      ctx.body = await strapi
        .plugin("tgauth")
        .service("tgauth")
        .update(ctx.params.id, ctx.request.body);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async toggle(ctx) {
    try {
      ctx.body = await strapi
        .plugin("tgauth")
        .service("tgauth")
        .toggle(ctx.params.id);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};
