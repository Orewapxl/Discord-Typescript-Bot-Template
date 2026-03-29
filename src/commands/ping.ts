import { SlashCommandBuilder } from "discord.js";
import { Command } from "../types/Command";

const ping: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ping. Pong!"),

  async execute(interaction) {
    await interaction.reply("Pong!");
  },
};

export default ping;