const { bot, getUrl, googleImageSearch } = require('../lib/')

bot(
	{
		pattern: 'google ?(.*)',
		fromMe: true,
		desc: 'Google Bilder Suche',
		type: 'search',
	},
	async (message, match) => {
		if (!message.reply_message || !message.reply_message.image)
			return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n*Markiere ein Bild*')
		const result = await googleImageSearch(
			await getUrl(
				await message.reply_message.downloadAndSaveMediaMessage('google')
			),
			'ris'
		)
		if (!result.length) return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Ich habe nichts gefunden_🤷‍♂️')
		return await message.send(result.join('\n'), {
			quoted: message.data,
		})
	}
)
