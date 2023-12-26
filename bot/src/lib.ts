import { Markup } from 'telegraf';

export const accessMessage = (
  ctx: any,
  admins: string[] | string,
  id: string
) => {
  const kb = [
    [Markup.button.webApp(ctx.i18n.t('bot.app'), process.env.FRONTEND!)],
  ];
  if (id == admins || admins.includes(id)) {
    kb.push([
      Markup.button.webApp(
        'Local test',
        `https://127.0.0.1:${process.env.HTTPS_PORT}/`
      ),
    ]);
  }
  return [ctx.i18n.t('preflight.welcome'), Markup.inlineKeyboard(kb)];
};
