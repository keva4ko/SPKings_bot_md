const { bot } = require('../lib/')
bot(
	{
		pattern: 'react ?(.*)',
		fromMe: true,
		desc: 'Auf eine Nachricht reagieren',
		type: 'misc',
	},
	async (message, match) => {
		if (!match || !message.reply_message)
			return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Beispiel: react ❣_')
		return await message.send(
			{
				text: match,
				key: message.reply_message.key,
			},
			{},
			'react'
		)
	}
)
