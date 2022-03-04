import { Telegraf, Context } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';

// script list
import helloScript from './hello';
import annonceScript from './annonce';

export const addScriptsToBot = (bot: Telegraf<Context<Update>>) => {
    helloScript(bot);
    annonceScript(bot);
};