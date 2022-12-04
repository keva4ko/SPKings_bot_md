const { bot, isAdmin } = require('../lib')

bot(
	{
		pattern: 'dlt ?(.*)',
		fromMe: true,
		desc: 'Markierte Nachricht löschen',
		type: 'whatsapp',
	},
	async (message, match) => {
		if (!message.reply_message)
			return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\nMarkiere eine Nachricht')
		const key = message.reply_message.key
		if (!key.fromMe && message.isGroup) {
			const participants = await message.groupMetadata(message.jid)
			const isImAdmin = await isAdmin(participants, message.client.user.jid)
			if (!isImAdmin) return await message.send(`⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Ich brauche dafür Adminrechte._`)
		}
		return await message.send(key, {}, 'delete')
	}
)
