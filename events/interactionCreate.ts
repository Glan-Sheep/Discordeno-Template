import { BotName } from "../bot.ts";
import {
  Interaction,
  InteractionResponseTypes,
  InteractionTypes,
} from "discordeno/mod.ts";
import { EmbedBuilder } from "../lib/embed.ts";
import log from "../utils/logger.ts";

BotName.events.interactionCreate = (_, interaction) => {
  if (!interaction.data) return;

  switch (interaction.type) {
    case InteractionTypes.ApplicationCommand: {
      log.info(`[Application Command] ${interaction.data.name} command`);
      const args = interaction.data.options;
      if (!args) {
        const reply = BotName.commands
          .get(interaction.data.name!)
          ?.execute(interaction);
        response(reply, interaction);
      } else {
        const reply = BotName.commands
          .get(interaction.data.name!)
          ?.execute(interaction, args);
        response(reply, interaction);
      }
      break;
    }
  }
};

function response(
  reply: EmbedBuilder | Promise<EmbedBuilder> | undefined,
  interaction: Interaction
) {
  if (reply instanceof Promise<EmbedBuilder>) {
    reply.then((embed) => {
      BotName.helpers.sendInteractionResponse(
        interaction.id,
        interaction.token,
        {
          type: InteractionResponseTypes.ChannelMessageWithSource,
          data: {
            embeds: [embed.data],
          },
        }
      );
    });
  } else if (reply instanceof EmbedBuilder) {
    BotName.helpers.sendInteractionResponse(interaction.id, interaction.token, {
      type: InteractionResponseTypes.ChannelMessageWithSource,
      data: {
        embeds: [reply.data],
      },
    });
  }
}
