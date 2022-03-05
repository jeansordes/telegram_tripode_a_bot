import { Telegraf } from 'telegraf';
import { addScriptsToBot } from './scripts';
import './dotenv-config';

// config the app
const token = process.env.BOT_TOKEN;
if (token === undefined) {
    throw new Error('BOT_TOKEN must be provided!');
}

// launch bot's scripts
const bot = new Telegraf(token);
addScriptsToBot(bot);
bot.launch().then(() => {
    console.log('✨ Telegram bot started')
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));