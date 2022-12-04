const config = require('../config')
const { trt, bot } = require('../lib/index')

bot(
	{
		pattern: 'trt ?(.*)',
		fromMe: true,
		desc: 'Google Übersetzer',
		type: 'search',
	},
	async (message, match) => {
		if (!message.reply_message.text)
			return await message.send(
				'⭐   _*Blvck Squad the Bot*_   ⭐\n\n_*Markiere eine Nachricht*_\nBeispiele: trt ml_\ntrt ml hi'
			)
		const [to, from] = match.split(' ')
		const msg = await trt(message.reply_message.text, to || config.LANG, from)
		if (msg) return await message.send(msg, { quoted: message.quoted })
	}
)
