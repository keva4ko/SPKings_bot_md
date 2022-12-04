const {
	bot,
	yts,
	song,
	video,
	addAudioMetaData,
	genListMessage,
} = require('../lib/')
const ytIdRegex =
	/(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/

bot(
	{
		pattern: 'yts ?(.*)',
		fromMe: true,
		desc: 'YT Suche',
		type: 'search',
	},
	async (message, match) => {
		if (!match) return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\nBeispiel:\nyts baymax')
		const vid = ytIdRegex.exec(match)
		if (vid) {
			const [result] = await yts(vid[1], true)
			const { title, description, metadata } = result
			return await message.send(
				`⭐   _*Blvck Squad the Bot*_   ⭐\n\n*Titel:* ${title}\n*Beschreibung:* ${description}\n*Länge:* ${metadata.length_seconds}s\n*Klicks:* ${metadata.view_count}\n*Uploaddatum:* ${metadata.publish_date}`
			)
		}

		const result = await yts(match)
		let msg = ''
		result.forEach(
			({ title, description, url, metadata }) =>
				(msg += `• ${title}\nKlicks: ${metadata.view_count}\nLänge: ${metadata.duration.accessibility_label}\nUploaddatum: ${metadata.published}\nBeschreibung: ${description}\nLink: ${url}\n\n`)
		)
		return await message.send(msg.trim())
	}
)

bot(
	{
		pattern: 'song ?(.*)',
		fromMe: true,
		desc: 'download yt song',
		type: 'download',
	},
	async (message, match) => {
		match = match || message.reply_message.text
		if (!match)
			return await message.send(
				'⭐   _*Blvck Squad the Bot*_   ⭐\n\nBeispiel:\nsong Name oder YT Link'
			)
		const vid = ytIdRegex.exec(match)
		if (vid) {
			const [result] = await yts(vid[1], true)
			const { id, author, title, thumbnail } = result
			return await message.send(
				await addAudioMetaData(
					await song(id),
					title,
					author,
					'',
					thumbnail.url
				),
				{ quoted: message.data, mimetype: 'audio/mpeg' },
				'audio'
			)
		} else {
			const result = await yts(match)
			return await message.send(
				genListMessage(
					result.map(({ title, id, duration }) => ({
						text: title,
						id: `song https://www.youtube.com/watch?v=${id}`,
						desc: duration.text,
					})),
					`⭐   _*Blvck Squad the Bot*_   ⭐\n\nSuche ${match}\n${result.length} Gefundene Ergebnisse`,
					'DOWNLOAD'
				),
				{},
				'list'
			)
		}
	}
)

bot(
	{
		pattern: 'video ?(.*)',
		fromMe: true,
		desc: 'download yt video',
		type: 'download',
	},
	async (message, match) => {
		match = match || message.reply_message.text
		if (!match)
			return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\nBeispiel:\nvideo yt_link')
		const vid = ytIdRegex.exec(match)
		if (!vid) {
			return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\nBeispiel:\nvideo yt_link')
			// const result = await yts(match)
			// match = result[0].id
		} else match = vid[1]
		return await message.send(
			await video(match),
			{ quoted: message.data },
			'video'
		)
	}
)
