import { BotName } from "../bot.ts";
import log from "utils/logger.ts";

BotName.events.messageCreate = (bot, message) => {
  if(message.mentionedUserIds.includes(bot.id)) {
    bot.helpers.addReaction(message.channelId, message.id, "🤧")
  }
}
