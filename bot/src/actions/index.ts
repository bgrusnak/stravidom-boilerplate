import { Telegraf } from 'telegraf'; 
import start from './start'; 

const actions = [start]; 
const init = (bot: Telegraf) => {
  actions.forEach((action) => action(bot));
};

export default init;
