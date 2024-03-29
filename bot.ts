import { createBot, Collection, GatewayIntents } from "discordeno/mod.ts";
import {
  BotWithCache,
  enableCachePlugin,
  enableCacheSweepers,
} from "discordeno/plugins/cache/mod.ts";
import {
  BotWithHelpersPlugin,
  enableHelpersPlugin,
} from "discordeno/plugins/helpers/mod.ts";
import { enablePermissionsPlugin } from "discordeno/plugins/permissions/mod.ts";
import { Command } from "./lib/mod.ts";
import "std/dotenv/load.ts"

const bot = createBot({
  token: Deno.env.get("TOKEN")!,
  intents:
    GatewayIntents.Guilds |
    GatewayIntents.GuildMessages |
    GatewayIntents.MessageContent,
  events: {},
});

// Enable All Plugins
enableHelpersPlugin(bot);
enableCachePlugin(bot);
enableCacheSweepers(bot as BotWithCache);
enablePermissionsPlugin(bot as BotWithCache);

export interface BotClient extends BotWithCache<BotWithHelpersPlugin> {
  commands: Collection<string, Command>;
}

export const BotName = bot as BotClient;

BotName.commands = new Collection();
