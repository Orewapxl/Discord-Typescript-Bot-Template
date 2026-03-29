import { Collection, Interaction } from "discord.js";
import { Command } from "../types/Command";

export default function createInteractionCreateEvent(
  commands: Collection<string, Command>
) {
  return {
    name: "interactionCreate",
    async execute(interaction: Interaction) {
      if (!interaction.isChatInputCommand()) return;

      const command = commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error("Command error:", error);

        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({
            content: "An error occurred while the command was running.",
            ephemeral: true,
          });
        } else {
          await interaction.reply({
            content: "An error occurred while the command was running.",
            ephemeral: true,
          });
        }
      }
    },
  };
}