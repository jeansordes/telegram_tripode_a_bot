import './../dotenv-config';
import { Context, Telegraf } from "telegraf"
import { Chat, Update } from "telegraf/typings/core/types/typegram"

export default (bot: Telegraf<Context<Update>>) => {
    const cmdToken = 'annonce';
    bot.command(cmdToken, ctx => {
        ctx.telegram.getChat(ctx.chat.id).then((chatInfos: Chat.LargeGetChat) => {
            if (chatInfos.linked_chat_id != undefined
                && ctx.chat.type == "supergroup"
                && ctx.from.is_bot != true) {
                // On prépare le message à envoyer dans le canal de diffusion
                let newMessageTitle = 'Annonce de @' + ctx.from.username;
                let forwardedText = ctx.message.text.replace('/' + cmdToken, '').trimStart();
                const offsetDelta = (ctx.message.text.length - forwardedText.length) - newMessageTitle.length;
                if (forwardedText != '') {
                    forwardedText = newMessageTitle + "\n" + forwardedText;
                    // La mise en forme des messages sur Telegram est géré par
                    // du texte accompagné d'une liste "d'entités", qui décrivent
                    // le texte, avec un "offset" et une "length".
                    // On a pas besoin de modifier la length
                    // en revanche, comme on va supprimer la partie "bot_command"
                    // du message, et on va changer l'offset de toutes
                    // les "entities" suivantes pour s'adapter
                    let newEntities = ctx.message.entities?.map(
                        el => ({ ...el, offset: el.offset - offsetDelta })
                    );
                    newEntities![0].offset = 0;
                    newEntities![0].length = newMessageTitle.length;
                    newEntities![0].type = 'bold';
                    // On envoie le tout
                    ctx.telegram.sendMessage(
                        chatInfos.linked_chat_id,
                        forwardedText,
                        { entities: newEntities }
                    );
                } else {
                    ctx.telegram.sendMessage(ctx.chat.id, `Woups, vous avez oublié d'écrire votre annonce`);
                }
            } else if (chatInfos.linked_chat_id == undefined) {
                ctx.telegram.sendMessage(ctx.chat.id, `Désolé, mais la discussion actuelle ne semble pas avoir de canal de diffusion associé`);
            }
        })
    })
}
