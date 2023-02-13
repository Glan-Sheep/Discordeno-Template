import { dirname, sep } from "std/path/mod.ts";
import { startBot } from "discordeno/mod.ts";
import { BotName } from "./bot.ts";
import { importCommands, importEvents, importPath } from "utils/loader.ts";
import { updateAppcationCommands } from "utils/updateCommands.ts";
import log from "utils/logger.ts";

import verify_config from "utils/verify-config.ts";

log.info("Starting bot...");

const configCorrect = verify_config();

if (!configCorrect) {
  log.error("Please fix your env files and try again");
  Deno.exit();
}

await startBot(BotName);
importPath(directory());
await importCommands();
await updateAppcationCommands();
await importEvents();

function directory(): string {
  const dir = `${dirname(import.meta.url)}${sep}`;
  if (Deno.build.os == "windows") {
    return dir.replace(/\\/g, "/").replace("file:///", "");
  } else {
    return dir.replace(/\\/g, "/").replace("file://", "");
  }
}
