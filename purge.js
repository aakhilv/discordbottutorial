module.exports = {
	name: "purge",
	async exe(Discord, bot, msg, args) {
		if (!msg.member.hasPermission("MANAGE_MESSAGES")) return; // Prevents random users from using the command.

		let count = parseInt(args[0], 10);
		if (!count || count < 1 || count > 100) return msg.channel.send("Please specify a number between 1 and 100."); // Checks if a number of messages to delete was specified, and if the number specified is valid.

		await msg.delete().then(async () => { // Deletes the message sent to run the command.
			await msg.channel.bulkDelete(count).then(() => { // Purges the specified number of messages from the channel, then logs the purge via a message.
				msg.channel.send(`Purged **${count}** messages.`).then(async msgs => {
					msgs.delete({ timeout: 2500 });
				});

				let channel = bot.channels.cache.get("CHANNEL_ID");

				let embed = new Discord.MessageEmbed()
					.setTitle(`#${msg.channel.name} was purged by ${msg.author.tag}`)
					.setDescription(`${count} message(s)`);

				channel.send(embed);
			});
		});
	},
};
