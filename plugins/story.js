const { story, bot } = require('../lib/')

bot(
	{
		pattern: 'story ?(.*)',
		fromMe: true,
		desc: 'Download Instagram stories',
		type: 'download',
	},
	async (message, match) => {
		match = match || message.reply_message.text
		if (!match) return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Beispiel: story username_')
		const result = await story(match)
		if (!result.length)
			return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n*Finde nix*🤷🏻‍♂️', {
				quoted: message.quoted,
			})
		for (const url of result) {
			await message.sendFromUrl(url)
		}
	}
)
