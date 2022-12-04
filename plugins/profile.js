const {
	bot,
	getName,
	formatTime,
	jidToNum,
	getGids,
	parsedJid,
	isUser,
	isGroup,
} = require('../lib/')
const fm = true

bot(
	{
		pattern: 'jid',
		fromMe: fm,
		desc: 'Give jid of chat/user',
		type: 'user',
	},
	async (message, match) => {
		return await message.send(
			message.mention[0] || message.reply_message.jid || message.jid
		)
	}
)

bot(
	{
		pattern: 'left',
		fromMe: fm,
		dec: 'Aus der Gruppe gehen',
		type: 'user',
		onlyGroup: true,
	},
	async (message, match) => {
		if (match) await message.send(match)
		return await message.leftFromGroup(message.jid)
	}
)

bot(
	{
		pattern: 'block',
		fromMe: fm,
		desc: 'Mitglied wird vom Bot blockiert',
		type: 'user',
	},
	async (message, match) => {
		const id =
			message.mention[0] ||
			message.reply_message.jid ||
			(!message.isGroup && message.jid)
		if (!id) return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n*Um wen gehts den?*')
		await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_NUTZER BLOCKIERT!_')
		await message.Block(id)
	}
)

bot(
	{
		pattern: 'unblock',
		fromMe: fm,
		desc: 'Mitglied vom Bot entblockieren',
		type: 'user',
	},
	async (message, match) => {
		const id =
			message.mention[0] ||
			message.reply_message.jid ||
			(!message.isGroup && message.jid)
		if (!id) return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n*Um wen gehts den?*')
		await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_BLOCK AUFGEHOBEN!_')
		await message.Unblock(id)
	}
)

bot(
	{
		pattern: 'pp',
		fromMe: fm,
		desc: 'Profilbild ändern',
		type: 'user',
	},
	async (message, match) => {
		if (!message.reply_message || !message.reply_message.image)
			return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n*Markiere ein Bild*')
		await message.updateProfilePicture(
			await message.reply_message.downloadMediaMessage()
		)
		return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Profilbild vom Bot wurde aktualisiert!_')
	}
)

bot(
	{
		pattern: 'whois ?(.*)',
		fromMe: fm,
		desc: 'To get PP and about',
		type: 'misc',
	},
	async (message, match) => {
		match = parsedJid(match)[0]
		const gid = (isGroup(match) && match) || message.jid
		const id =
			(isUser(match) && match) ||
			message.mention[0] ||
			message.reply_message.jid
		let pp = ''
		try {
			pp = await message.profilePictureUrl(id || gid)
		} catch (error) {
			pp = 'https://cdn.wallpapersafari.com/0/83/zKyWb6.jpeg'
		}
		let caption = ''
		if (id) {
			try {
				const { status, setAt } = await message.fetchStatus(id)
				caption += `*Mitgliedinformationen*\n\n*Name:* ${await getName(gid, id)}\n*Nummer:* +${jidToNum(
					id
				)}\n*Status:* ${status}\n*Zuletzt gesehen:* ${formatTime(setAt, id)}`
			} catch (error) {}
		} else {
			const { subject, size, creation, desc, owner } =
				await message.groupMetadata(gid, !!gid)
			caption += `*Name:* ${subject}\n*Owner:* ${owner ? '+' : ''}${jidToNum(
				owner
			)}\n*Mitglieder:* ${size}\n*Erstellt:* ${formatTime(
				creation
			)}\n*Beschreibung:* ${desc}`
		}
		return await message.sendFromUrl(pp, { caption })
	}
)

bot(
	{
		pattern: 'gjid',
		fromMe: fm,
		desc: 'List group jids',
		type: 'user',
	},
	async (message, match) => {
		const gids = await getGids()
		let msg = ''
		for (const { name, id } of gids) msg += `*${name} :* ${id}\n\n`
		await message.send(msg.trim())
	}
)
