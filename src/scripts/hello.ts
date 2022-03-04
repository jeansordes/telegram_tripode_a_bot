import { Context, Telegraf } from "telegraf"
import { Update } from "telegraf/typings/core/types/typegram"


export default (bot: Telegraf<Context<Update>>) => {
    bot.command('hello', ctx => {
        console.log(ctx.from)
        bot.telegram.sendMessage(ctx.chat.id, 'world');
    })
}
