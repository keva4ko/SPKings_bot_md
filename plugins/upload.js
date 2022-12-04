const { bot, isUrl, getImgUrl } = require('../lib/')
bot(
	{
		pattern: 'upload ?(.*)',
		fromMe: true,
		desc: 'Download vom Link',
		type: 'download',
	},
	async (message, match) => {
		match = isUrl(match || message.reply_message.text)
		if (!match) return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Beispiel:_\n upload [Link]')
		if (match.startsWith('https://images.app.goo.gl'))
			match = await getImgUrl(match)
		await message.sendFromUrl(match, { buffer: false })
	}
)
