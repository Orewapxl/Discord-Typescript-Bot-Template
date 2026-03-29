import { Client, ActivityType } from "discord.js";

export default {
  name: "ready",
  once: true,
  execute(client: Client<true>) {
    console.log(`Ready ${client.user.tag}`);

    client.user.setPresence({
      activities: [
        {
          name: "Pixel v14 bot template!",
          type: ActivityType.Custom,
        },
      ],
      status: "idle",
    });
  },  
};