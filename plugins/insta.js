const { instagram, bot } = require('../lib/')

bot(
	{
		pattern: 'insta ?(.*)',
		fromMe: true,
		desc: 'Download Instagram Posts',
		type: 'download',
	},
	async (message, match) => {
		match = match || message.reply_message.text
		if (!match) return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\nBeispiel: insta [Link]')
		const result = await instagram(match)
		if (!result.length)
			return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Nope, nix gefunden 🤷_', {
				quoted: message.quoted,
			})
		for (const url of result) {
			await message.sendFromUrl(url)
		}
	}
)
