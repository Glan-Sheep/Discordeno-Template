import { BotName } from "../bot.ts";
import log from "utils/logger.ts";

export async function updateAppcationCommands() {
  await BotName.helpers.upsertGlobalApplicationCommands(BotName.commands.array());
  log.info(BotName.commands.array());
}
