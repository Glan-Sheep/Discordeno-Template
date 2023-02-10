import { BotName } from "../bot.ts";
import { Command } from "lib/mod.ts";

export function createCommand(command: Command) {
  if (!command.devOnly) BotName.commands.set(command.name, command);
}
