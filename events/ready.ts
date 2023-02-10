import { BotName } from "../bot.ts";
import log from "utils/logger.ts";

BotName.events.ready = () => {
  log.info(`[READY]`);
};
