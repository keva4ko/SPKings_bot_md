const { reddit, bot, isUrl } = require('../lib/')

bot(
	{
		pattern: 'reddit ?(.*)',
		fromMe: true,
		desc: 'Download reddit video',
		type: 'download',
	},
	async (message, match) => {
		match = isUrl(match || message.reply_message.text)
		if (!match) return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Beispiel: reddit [Link]_')
		const result = await reddit(match)
		if (!result)
			return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n*Leere hier...*', {
				quoted: message.quoted,
			})
		return await message.sendFromUrl(result)
	}
)
