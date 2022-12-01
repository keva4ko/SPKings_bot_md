const { bot, aliveMessage } = require('../lib/')

bot(
	{
		pattern: 'alive ?(.*)',
		fromMe: true,
		desc: 'Nachricht bei Befehl',
		type: 'misc',
	},
	async (message, match) => {
		const { msg, options, type } = await aliveMessage(match, message)
		return await message.send('⭐   _*Black Squad the Bot*_   ⭐\n\nSetzt Nachricht bei -alive\nBeispiel: alive [Text]')
	}
)
