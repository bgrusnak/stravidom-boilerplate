import { accessMessage } from '..//lib';
import { Telegraf } from 'telegraf';
const func = (bot: Telegraf) => {
  return bot.start(async (ctx: any) => {
    try {
      const user = await ctx.db.oneOrNone(
        'select * from "user" where  id=\'$1\'',
        [ctx.from!.id]
      );
      if (!user) {
        await ctx.db.query(
          'insert into "user" (id, username, language_code, first_name, last_name) VALUES ($1, $2, $3, $4, $5)',
          [
            String(ctx.from!.id),
            ctx.from!.username,
            ctx.from!.language_code,
            ctx.from!.first_name,
            ctx.from!.last_name,
          ]
        );
      }
    } catch (e) {
      console.log('DB error');
      console.log(e);
    }
    await ctx.send(
      ctx,
      'sendMessage',
      accessMessage(ctx, process.env.ADMINS!, String(ctx.from!.id))
    );
  });
};

export default func;
