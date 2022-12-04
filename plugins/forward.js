const { forwardOrBroadCast, bot, parsedJid } = require('../lib/')

bot(
	{
		pattern: 'forward ?(.*)',
		fromMe: true,
		desc: 'Markierte Nachricht weiterleiten',
		type: 'misc',
	},
	async (message, match) => {
		if (!message.reply_message)
			return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n*Markiere eine Nachricht*')
		for (const jid of parsedJid(match)) await forwardOrBroadCast(jid, message)
	}
)

bot(
	{
		pattern: 'save ?(.*)',
		fromMe: true,
		desc: 'Markierte Nachricht an mich weiterleiten',
		type: 'misc',
	},
	async (message, match) => {
		if (!message.reply_message)
			return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n*Markiere eine Nachricht*')
		await forwardOrBroadCast(message.participant, message)
	}
)
