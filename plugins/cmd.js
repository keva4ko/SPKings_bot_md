const { setCmd, bot, getCmd, delCmd } = require('../lib/index')

bot(
	{
		pattern: 'setcmd ?(.*)',
		fromMe: true,
		desc: 'Kurzbefehl an einen Sticker anhängen',
		type: 'misc',
	},
	async (message, match) => {
		if (!message.reply_message || !message.reply_message.sticker)
			return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\nAntworte auf einen Sticker')
		if (!match) return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\nBefehl per Sticker absenden\nBeispiel: setcmd ping')
		const res = await setCmd(match, message.reply_message)
		return await message.send(res < 1 ? '⭐️   _*Blvck Squad the Bot*_   ⭐️\n\n_FEHLER_😵' : '⭐️   _*Blvck Squad the Bot*_   ⭐️\n\n_Okay Boss_👍')
	}
)

bot(
	{
		pattern: 'getcmd ?(.*)',
		fromMe: true,
		desc: 'Gesetzte Kurzbefehle anzeigen',
		type: 'misc',
	},
	async (message, match) => {
		const res = await getCmd()
		if (!res.length) return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\nEs wurden noch keine cmds gesetzt🤷‍♂️')
		return await message.send('```' + res.join('\n') + '```')
	}
)

bot(
	{
		pattern: 'delcmd ?(.*)',
		fromMe: true,
		desc: 'Kurzbefehle löschen',
		type: 'misc',
	},
	async (message, match) => {
		if (!match && (!message.reply_message || !message.reply_message.sticker))
			return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\nLöscht einen Befehl\nBeispiel: delcmd Befehl | Sticker markieren')
		const res = await delCmd(match || message.reply_message)
		return await message.send(res < 1 ? '⭐️   _*Blvck Squad the Bot*_   ⭐️\n\n_FEHLER_😭' : '⭐️   _*Blvck Squad the Bot*_   ⭐️\n\n_Okay, Befehl ist weg!🙃_')
	}
)
