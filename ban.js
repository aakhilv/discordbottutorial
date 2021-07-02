module.exports = {
  name: "ban",
  async exe(Discord, bot, msg, args) {
    if (!msg.member.hasPermission("BAN_MEMBERS")) return; // Prevents random users from using the command.

    let member = msg.mentions.members.first();
    if (!member || !member.bannable) return msg.channel.send("Please specify a valid user."); // Checks if a user was mentioned, or if the user is "bannable".

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason provided."; // Sets a default reason if no reason is specified.

    await msg.guild.members.ban(member, { reason }).then(() => { // Bans the user, then logs the ban via a message.
      msg.channel.send(`Successfully banned **${member}**.`);

      let channel = bot.channels.cache.get("CHANNEL_ID");

      let embed = new Discord.MessageEmbed()
        .setTitle(`${member.user.tag} was banned by ${msg.author.tag}`)
        .setDescription(reason);

      channel.send(embed);
    });
  },
};
