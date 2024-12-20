import { SubscriberArgs, type SubscriberConfig } from "@medusajs/medusa";
import { Modules } from "@medusajs/framework/utils";

export default async function resetPasswordTokenHandler({
  event: {
    data: { entity_id: email, token, actor_type },
  },
  container,
}: SubscriberArgs<{ entity_id: string; token: string; actor_type: string }>) {
  const notificationModuleService = container.resolve(Modules.NOTIFICATION);

  const urlPrefix =
    actor_type === "customer"
      ? process.env.MEDUSA_STOREFRONT_URL
      : process.env.MEDUSA_BACKEND_URL;
  const url = `${urlPrefix}/callback?action=passwordReset&token=${token}&email=${email}`;

  console.log("Trigger Sendgrid Notification Module");

  await notificationModuleService.createNotifications({
    to: email,
    channel: "email",
    content: {
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Password reset</title>
          </head>
          <body>
            <h1>You've requested password reset</h1>
            <a href=${url} target="_blank">Click here</a>
          </body>
        </html>
      `,
    },
    template: "n/a",
  });
}

export const config: SubscriberConfig = {
  event: "auth.password_reset",
};
