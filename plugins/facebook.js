const { facebook, bot, genButtonMessage, isUrl } = require('../lib/')

bot(
	{
		pattern: 'fb ?(.*)',
		fromMe: true,
		desc: 'Download Facebook Video',
		type: 'download',
	},
	async (message, match) => {
		match = isUrl(match || message.reply_message.text)
		if (!match) return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\nLädt Videos aus Facebook herunter\nBeispiel:\nfb [Link]')
		const result = await facebook(match)
		if (!result.length)
			return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Du führst mich zu nichts._😕', {
				quoted: message.quoted,
			})
		return await message.send(
			await genButtonMessage(
				result.map((e) => ({
					id: `upload ${e.url}`,
					text: e.quality,
				})),
				'⭐   _*Blvck Squad the Bot*_   ⭐\n\nWähle die Videoqualität'
			),
			{},
			'button'
		)
	}
)
