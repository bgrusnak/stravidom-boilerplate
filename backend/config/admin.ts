import crypto from "crypto";

export default ({ env }) => {
  return {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "D&^I%^SFRYTTSU%D^WUERADETyURT"),
    },
    apiToken: {
      salt: env("API_TOKEN_SALT", crypto.randomBytes(16).toString("base64")),
    },
    transfer: {
      token: {
        salt: env("TRANSFER_TOKEN_SALT"),
      },
    },
    flags: {
      nps: env.bool("FLAG_NPS", true),
      promoteEE: env.bool("FLAG_PROMOTE_EE", true),
    },
    port: 1337,
    url: env("ADMIN_PATH", "/admin"),
    emitErrors: true,
  };
};
