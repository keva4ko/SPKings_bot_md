const config = require('../config')
const {
	bot,
	setWarn,
	jidToNum,
	genButtonMessage,
	isAdmin,
	deleteWarn,
} = require('../lib/')

bot(
	{
		pattern: 'warn ?(.*)',
		fromMe: true,
		desc: 'Warnt Mitglieder bis zum kick',
		type: 'group',
		onlyGroup: true,
	},
	async (message, match) => {
		if (!match && !message.reply_message)
			return await message.send(
				'⭐️   *_Black Squad the Bot_*   ⭐️\n\nWarnt Mitglieder bis sie gekickt werden.\n*Beispiele:*\nwarn [Markieren]\nwarn reset [Markieren]'
			)
		let [m, u] = match.split(' ')
		if (m && m.toLowerCase() == 'reset') {
			u =
				u && u.endsWith('@s.whatsapp.net')
					? u
					: message.mention[0] || message.reply_message.jid
			if (!u) return await message.send('⭐️   _*Blvck Squad the Bot*_   ⭐️\n\n*Markiere einen Mitglied*')
			const count = await setWarn(u, message.jid, (!isNaN(u) && u) || -1)
			return await message.send(
				`⭐️   _*Blvck Squad the Bot*_   ⭐️\n\nWarnungen zurückgesetzt bei @${jidToNum(u)}.`,
				{ contextInfo: { mentionedJid: [u] } }
			)
		}
		const user = message.mention[0] || message.reply_message.jid
		if (!user) return await message.send('⭐️   _*Blvck Squad the Bot*_   ⭐️\n\n*Markiere einen Mitglied*')
		const count = await setWarn(user, message.jid)
		if (count > config.WARN_LIMIT) {
			const participants = await message.groupMetadata(message.jid)
			const isImAdmin = await isAdmin(participants, message.client.user.jid)
			if (!isImAdmin) return await message.send(`⭐️   _*Blvck Squad the Bot*_   ⭐️\n\n_Mir fehlen Adminrechte._`)
			const isUserAdmin = await isAdmin(participants, user)
			if (isUserAdmin)
				return await message.send(`⭐️   _*Blvck Squad the Bot*_   ⭐️\n\n_Admins können nicht entfernt werden._`)
			await message.send(
				`⭐️   _*Blvck Squad the Bot*_   ⭐️\n\n_Der Mitglied @${jidToNum(user)} hat seine letzte Chance vergeigt._\n BB👋🏽`,
				{ contextInfo: { mentionedJid: [user] } }
			)
			await deleteWarn(user, message.jid)
			return await message.Kick(user)
		}
		return await message.send(
			await genButtonMessage(
				[{ id: `warn reset ${user}`, text: 'Warnung entfernen' }],
				`⭐️   _*Blvck Squad the Bot*_   ⭐️\n\n⚠️!!!WARNUNG!!!⚠️\nMitglied @${jidToNum(
					user
				)}\n*Dir wurde eine Warnung ausgesprochen, pass auf was du als nächstes machst sonst droht der Kick!*`
			),
			{ contextInfo: { mentionedJid: [user] } },
			'button'
		)
	}
)
