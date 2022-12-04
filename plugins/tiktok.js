const { tiktok, bot, isUrl } = require('../lib/index')

bot(
	{
		pattern: 'tiktok ?(.*)',
		fromMe: true,
		desc: 'Download tiktok video',
		type: 'download',
	},
	async (message, match) => {
		match = isUrl(match || message.reply_message.text)
		if (!match) return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Beispiel: tiktok [Link]_')
		const result = await tiktok(match)
		if (!result)
			return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_*Video nicht gefunden!*', {
				quoted: message.quoted,
			})
		return await message.sendFromUrl(result.url2)
	}
)
