import { dirname, sep } from "std/path/mod.ts";
import { startBot } from "discordeno/mod.ts";
import { BotName } from "./bot.ts";
import { importCommands, importEvents, importPath } from "utils/loader.ts";
import { updateAppcationCommands } from "utils/updateCommands.ts";
import log from "utils/logger.ts";

log.info("Starting bot...");

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
