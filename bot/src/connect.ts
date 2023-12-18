import { Context, session, Telegraf } from 'telegraf';
import { Job, Queue, Worker } from 'bullmq';
import Redis from 'ioredis';
import Postgres from 'pg-promise';
import I18n from 'telegraf-i18n';

const connect = async (options: any) => {
  const i18n = new I18n(options.i18n);

  const pgp = Postgres();
  const db = pgp(options.postgres);

  const bot = new Telegraf<BotContext>(options.token);

  const redis = new Redis(options.redis);

  const queue = new Queue(options.name, {
    connection: redis,
  });

  const telegramWorker = async (job: Job) => {
    /* @ts-ignore */
    bot.telegram[job.name]
      .apply(bot.telegram, [job.data.target, ...job.data.data])
      .then((res: any) => {})
      .catch((err: any) => {
        console.log('Got error');
        console.log(err);
        // throw err;
      });
  };

  new Worker(options.name, telegramWorker, {
    drainDelay: 1,
    connection: redis,
    limiter: {
      max: 28,
      duration: 1000,
    },
  });

  interface SessionData { 
    context: Object;
  }

  interface BotContext extends Context {
    session?: SessionData;
  }

  const send = async (ctx: Context, name: string, data: any) => {
    return await queue.add(
      name,
      {
        target: ctx.chat ? ctx.chat.id : ctx.from!.id,
        data,
      },
      {
        removeOnComplete: true,
        removeOnFail: false,
        attempts: 9999,
        backoff: {
          type: 'fixed',
          delay: 1000,
        },
      }
    );
  };

  const dbMiddleware = () => (ctx: any, next: any) => {
    ctx.db = db;
    return next();
  };

  bot.use(dbMiddleware());

  const redisMiddleware = () => (ctx: any, next: any) => {
    ctx.send = send;
    return next();
  };

  bot.use(redisMiddleware());

  bot.use(session());
  bot.use(i18n.middleware());
  return bot;
};

export default connect;
