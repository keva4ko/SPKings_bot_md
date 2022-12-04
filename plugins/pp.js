const { bot } = require('../lib/')

bot(
	{
		pattern: 'fullpp ?(.*)',
		fromMe: true,
		desc: 'Setzt Profilbild vom Bot',
		type: 'user',
	},
	async (message, match) => {
		if (!message.reply_message || !message.reply_message.image)
			return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n*Markiere ein Bild.*')
		await message.updateProfilePicture(
			await message.reply_message.downloadMediaMessage(),
			message.client.user.jid
		)
		return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Profilbild vom Bot wurde aktualisiert!_')
	}
)
