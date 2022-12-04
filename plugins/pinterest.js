const { pinterest, bot, isUrl } = require('../lib/')

bot(
	{
		pattern: 'pinterest ?(.*)',
		fromMe: true,
		desc: 'Download pinterest Video/Bilder',
		type: 'download',
	},
	async (message, match) => {
		match = isUrl(match || message.reply_message.text)
		if (!match) return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\nLade Bilder oder Videos aus Pinterest herunter\nBeispiel: pinterest [Link]')
		const result = await pinterest(match)
		if (!result.length)
			return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Sicher das ich da was finden sollte?_🙄', {
				quoted: message.quoted,
			})
		return await message.sendFromUrl(result)
	}
)
