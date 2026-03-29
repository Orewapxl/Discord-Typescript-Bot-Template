import { Client, Collection, GatewayIntentBits, REST, Routes } from "discord.js";
import dotenv from "dotenv";

import commandsArray from "./commands";
import { Command } from "./types/Command";
import readyEvent from "./events/ready";
import createInteractionCreateEvent from "./events/interactionCreate";

dotenv.config();

const token = process.env.BOT_TOKEN;
const clientId = process.env.CLIENT_ID;

if (!token) {
  throw new Error("BOT_TOKEN not found.");
}

if (!clientId) {
  throw new Error("CLIENT_ID not found.");
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const commands = new Collection<string, Command>();

for (const cmd of commandsArray) {
  commands.set(cmd.data.name, cmd);
}

const rest = new REST({ version: "10" }).setToken(token);

client.once("ready", async (client) => {
  console.clear()
  try {
    await rest.put(
      Routes.applicationCommands(clientId),
      {
        body: commandsArray.map((cmd) => cmd.data.toJSON()),
      }
    );

    console.log("[Slash commands have been loaded.]");
  } catch (error) {
    console.error("Command loading error:", error);
  }

  readyEvent.execute(client);
});

const interactionCreateEvent = createInteractionCreateEvent(commands);

client.on("interactionCreate", async (interaction) => {
  await interactionCreateEvent.execute(interaction);
});

client.login(token);