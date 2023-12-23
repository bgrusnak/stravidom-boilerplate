module.exports = [
  {
    method: "GET",
    path: "/",
    handler: "tgauth.validate",
    config: {
      policies: [],
      auth: false,
    },
  },
/* 
  {
    method: "GET",
    path: "/find",
    handler: "tgauth.find",
    config: {
      policies: [],
    },
  },

  {
    method: "POST",
    path: "/create",
    handler: "tgauth.create",
    config: {
      policies: [],
    },
  },

  {
    method: "DELETE",
    path: "/delete/:id",
    handler: "tgauth.delete",
    config: {
      policies: [],
    },
  },

  {
    method: "PUT",
    path: "/toggle/:id",
    handler: "tgauth.toggle",
    config: {
      policies: [],
    },
  },

  {
    method: "PUT",
    path: "/update/:id",
    handler: "tgauth.update",
    config: {
      policies: [],
    },
  },
 */
];
