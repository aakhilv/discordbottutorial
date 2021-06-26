module.exports = {
  name: "kick",
  async exe(Discord, bot, msg, args) {
    if (!msg.member.hasPermission("KICK_MEMBERS")) return; // Prevents random users from using the command.

    let member = msg.mentions.members.first();
    if (!member || !member.kickable) return msg.channel.send("Please specify a valid user."); // Checks if a user was mentioned, or if the user is "kickable".

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason provided."; // Sets a default reason if no reason is specified.

    await member.kick(reason).then(() => { // Kicks the user, then logs the kick via a message.
      msg.channel.send(`Successfully kicked **${member}**.`);

      let channel = bot.channels.cache.get("CHANNEL_ID");

      let embed = new Discord.MessageEmbed()
        .setTitle(`${member.user.tag} was kicked by ${msg.author.tag}`)
        .setDescription(reason);

      channel.send(embed);
    });
  },
};
