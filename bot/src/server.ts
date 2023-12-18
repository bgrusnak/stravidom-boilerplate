import dotenv from 'dotenv';
import path from 'path';

import connect from './connect';
import init from './actions'; 

dotenv.config();
 
const token = process.env.BOT_TOKEN;
if (token === undefined) {
  throw new Error('BOT_TOKEN must be provided!');
} 


connect({
  token,
  name: 'bot',
  i18n: {
    defaultLanguage: 'en',
    defaultLanguageOnMissing: true,
    useSession: true,
    allowMissing: true, // Default true
    directory: path.resolve(__dirname, '..', 'locales'),
  },
  postgres: {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD, 
  },
  redis: {
    port: Number(process.env.REDIS_PORT) || 6379,
    host: 'redis',
    db: 0,
    password: process.env.REDIS_PASSWORD,
    maxRetriesPerRequest: null,
  },
}).then(bot => { 
  init(bot);
  bot.launch();
  console.log('Bot launched');

  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
});
