import { accessMessage } from '../lib';
import { Telegraf } from 'telegraf';
const func = (bot: Telegraf) => {
  return bot.start(async (ctx: any) => {
    await ctx.send(
      ctx,
      'sendMessage',
      accessMessage(ctx, process.env.ADMINS!, String(ctx.from!.id))
    );
  });
};

export default func;
