const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const imageSearch = require('../image_search');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('search')
		.setDescription('Search for an image')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('The search term')
				.setRequired(true)),
		
	async execute(interaction) {
		const query = interaction.options.getString('input');
		const searchResult = await imageSearch.search(query);
		const url = searchResult.currentSearch().link;
		const exampleEmbed = new MessageEmbed()
			.setTitle(query)
			.setImage(url);
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('prev')
					.setLabel('Previous')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('next')
					.setLabel('Next')
					.setStyle('PRIMARY'),
			);
		await interaction.reply({ embeds: [exampleEmbed], components: [row] });

	},
};