import { ApplicationCommandOptionTypes, ApplicationCommandTypes } from "discordeno/mod.ts";
import  {axiod} from "axiod"
import { createCommand } from "../mod.ts";
import { EmbedBuilder } from "lib/mod.ts";

createCommand({
  name: "cmdName",
  description: "cmdDescription",
  type: ApplicationCommandTypes.ChatInput,
  async execute(): Promise<EmbedBuilder> {
    const data = await axiod.get("https://google.com/");
    const embeds = new EmbedBuilder();
    return embeds;
  },
});
