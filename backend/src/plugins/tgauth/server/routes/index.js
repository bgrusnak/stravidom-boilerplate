module.exports = {
  "": {
    type: "content-api",
    routes: [
      {
        method: "POST",
        path: "/",
        handler: "tgauth.validate",
        config: {
          policies: [],
          roles: ["Authenticated", "Public"],
          auth: false,
          description: "Validate the user using the data, provided by Telegram",
          tag: {
            plugin: "Tgauth",
            name: "validate",
          },
        },
      },
      {
        method: "POST",
        path: "/agree",
        handler: "tgauth.agree",
        config: {
          policies: [],
          roles: ["Authenticated"],
          description: "Agree with rules",
          tag: {
            plugin: "Tgauth",
            name: "agree",
          },
        },
      },
    ],
  },
};
