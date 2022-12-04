const { bot } = require('../lib/')

bot(
	{
		pattern: 'clear ?(.*)',
		fromMe: true,
		desc: 'Löscht dein Chatverlauf',
		type: 'whatsapp',
	},
	async (message, match) => {
		await message.clearChat(message.jid)
		await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Chatverlauf gelöscht_🫡')
	}
)
