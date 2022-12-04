const { twitter, bot, genButtonMessage, isUrl } = require('../lib/')

bot(
	{
		pattern: 'twitter ?(.*)',
		fromMe: true,
		desc: 'Download twitter video',
		type: 'download',
	},
	async (message, match) => {
		match = isUrl(match || message.reply_message.text)
		if (!match) return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Beispiel:\ntwitter [Link]_')
		const result = await twitter(match)
		if (!result.length)
			return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_*Video nicht gefunden!*', {
				quoted: message.quoted,
			})
		return await message.send(
			await genButtonMessage(
				result.map((e) => ({
					id: `upload ${e.url}`,
					text: e.quality.split('x')[0],
				})),
				'Wähle die Videoqualität aus'
			),
			{},
			'button'
		)
	}
)
