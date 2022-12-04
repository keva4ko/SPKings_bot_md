const { setLydia, bot } = require('../lib/')

bot(
	{
		pattern: 'lydia ?(.*)',
		fromMe: true,
		desc: 'Chatbot an-/ausschalten',
		type: 'misc',
	},
	async (message, match) => {
		if (!match)
			return await message.send(
				'⭐   _*Blvck Squad the Bot*_   ⭐\n\nBeispiel: lydia on/off'
			)
		const user = message.mention[0] || message.reply_message.jid
		await setLydia(message.jid, match == 'on', user)
		await message.send(
			`⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Dein Chatbot wurde erfolgreich ${
				match == 'on' ? 'AKTIVIERT' : 'DEAKTIVIERT'
			}._\n*Funktioniert nur wenn man markiert wird.*`
		)
	}
)
