"use strict";

const crypto = require("crypto");

const verifyInitData = (queryParams, botToken, secondsToExpire = 0) => {
  const hash = queryParams.get("hash");
  queryParams.delete("hash");
  const data = {};
  for (const [key, value] of queryParams.entries()) {
    data[key] = value;
  }
  const dataCheckString = Object.keys(data)
    .sort()
    .map((key) => `${key}=${data[key]}`)
    .join("\n");
  const secretKey = crypto
    .createHmac("sha256", "WebAppData")
    .update(botToken)
    .digest();
  const calculatedHash = crypto
    .createHmac("sha256", secretKey)
    .update(dataCheckString)
    .digest("hex");
  if (secondsToExpire == 0) {
    return calculatedHash === hash;
  } else {
    const currentTime = Math.round(Date.now() / 1000);
    const currentAndAuthTimeDiff =
      currentTime - parseInt(urlParams.get("auth_date"));
    return currentAndAuthTimeDiff < secondsToExpire && calculatedHash == hash;
  }
};

module.exports = ({ strapi }) => ({
  async agree(ctx) {
    const tguser = await strapi.db
      .query("plugin::tgauth.telegram-user")
      .findOne({
        where: { user_id: ctx.state.user.id },
      });
    if (!tguser) {
      throw new Error(
        `Telegram user is not registered for ${ctx.state.user.id}`
      );
    }
    await strapi.entityService.update(
      "plugin::tgauth.telegram-user",
      tguser.id,
      {
        data: { agreed_rules: true },
      }
    );
    return { agreed_rules: true };
  },

  async validate(body) {
    const queryParams = new URLSearchParams(body[0]);
    const validated = await verifyInitData(queryParams, process.env.BOT_TOKEN);
    if (!validated) throw new Error("Wrong telegram data");
    const userQuery = JSON.parse(queryParams.get("user"));
    let user;
    let tguser = await strapi.db.query("plugin::tgauth.telegram-user").findOne({
      where: { telegram_id: userQuery.id },
    });
    if (!tguser) {
      // If the user doesn't exist, create a new user
      const foundRole = await strapi
        .query("plugin::users-permissions.role")
        .findOne({ where: { type: "authenticated" } });
      if (!foundRole) throw Error(`role 'authenticated' does not exist`);
      user = await strapi.db.query("plugin::users-permissions.user").create({
        data: {
          username:
            userQuery.username || userQuery.last_name
              ? userQuery.first_name + " " + userQuery.last_name
              : userQuery.first_name,
          confirmed: true,
          role: foundRole.id,
          created_by: 1, //user admin id
          updated_by: 1,
          provider: 'telegram'
        },
      });

      tguser = await strapi.db.query("plugin::tgauth.telegram-user").create({
        data: {
          user_id: user.id,
          username: userQuery.username,
          telegram_id: userQuery.id,
          first_name: userQuery.first_name,
          last_name: userQuery.last_name,
          language: userQuery.language_code,
        },
      });
    }

    // Generate Strapi JWT token
    const jwtToken = await strapi
      .service("plugin::users-permissions.jwt")
      .issue({ id: tguser.user_id });

    // Return successful authentication and user information
    return { token: jwtToken, user: tguser, authenticated: true };
  },
});
