import { loadEnv, defineConfig } from "@medusajs/framework/utils";

loadEnv(process.env.NODE_ENV || "development", process.cwd());

module.exports = defineConfig({
  // plugins: [
  //   {
  //     resolve: "medusa-plugin-auth",
  //     /** @type {import('medusa-plugin-auth').AuthOptions} */
  //     options: [
  //       {
  //         type: "google",
  //         strict: "none",
  //         identifier: "google",
  //         clientID: process.env.GOOGLE_CLIENT_ID,
  //         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //         store: {
  //           callbackUrl: `${process.env.MEDUSA_BACKEND_URL}/store/auth/google/cb`,
  //           failureRedirect: `${process.env.MEDUSA_STOREFRONT_URL}/login`,
  //           // The success redirect can be overriden from the client by adding a query param `?redirectTo=your_url` to the auth url
  //           // This query param will have the priority over this configuration
  //           successRedirect: `${process.env.MEDUSA_BACKEND_URL}/callback?action=googleSign`,
  //           // authPath: '/store/auth/google',
  //           // authCallbackPath: '/store/auth/google/cb',
  //           // expiresIn: 24 * 60 * 60 * 1000,
  //         },
  //       },
  //     ],
  //   },
  // ],
  modules: [
    {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          {
            resolve: "./src/modules/bog",
            id: "bog-payment",
          },
        ],
      },
    },
    {
      resolve: "./src/modules/marketplace",
    },
    {
      resolve: "@medusajs/medusa/notification",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/notification-sendgrid",
            id: "sendgrid",
            options: {
              channels: ["email"],
              api_key: process.env.SENDGRID_API_KEY,
              from: process.env.SENDGRID_FROM,
            },
          },
        ],
      },
    },
    // {
    //   resolve: "@medusajs/medusa/cache-redis",
    //   options: {
    //     redisUrl: process.env.REDIS_URL,
    //   },
    // },
    // {
    //   resolve: "@medusajs/medusa/event-bus-redis",
    //   options: {
    //     redisUrl: process.env.REDIS_URL,
    //   },
    // },
    // {
    //   resolve: "@medusajs/medusa/workflow-engine-redis",
    //   options: {
    //     redis: {
    //       url: process.env.REDIS_URL,
    //     },
    //   },
    // },
  ],
  admin: {
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true",
    backendUrl: process.env.MEDUSA_BACKEND_URL!,
    storefrontUrl: process.env.MEDUSA_STOREFRONT_URL!,
    path: process.env.MEDUSA_ADMIN_PATH as `/${string}`,
  },
  featureFlags: {
    analytics: false,
  },
  projectConfig: {
    workerMode: process.env.MEDUSA_WORKER_MODE as
      | "shared"
      | "worker"
      | "server",
    databaseUrl: process.env.DATABASE_URL,
    sessionOptions: {
      name: "__session",
    },
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET!,
      cookieSecret: process.env.COOKIE_SECRET!,
    },
  },
});
