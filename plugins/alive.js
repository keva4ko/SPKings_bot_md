const { bot, aliveMessage } = require('../lib/')

bot(
	{
		pattern: 'on ?(.*)',
		fromMe: true,
		desc: 'Onlinestatus',
		type: 'misc',
	},
	async (message, match) => {
		const { msg, options, type } = await aliveMessage(match, message)
		return await message.send('⭐   _*Black Squad the Bot*_   ⭐\n\n   Alle Systeme *ONLINE*!✅')
	}
)
