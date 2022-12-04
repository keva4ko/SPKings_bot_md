const {
	sticker,
	webpToMp4,
	addExif,
	bot,
	addAudioMetaData,
	circleSticker,
} = require('../lib/')
const fm = true

bot(
	{
		pattern: 'sticker',
		fromMe: fm,
		desc: 'Bild oder Video zu Sticker',
		type: 'sticker',
	},
	async (message, match) => {
		if (
			!message.reply_message ||
			(!message.reply_message.video && !message.reply_message.image)
		)
			return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n*Markiere einen Bild oder Video.*')
		return await message.send(
			await sticker(
				'str',
				await message.reply_message.downloadAndSaveMediaMessage('sticker'),
				message.reply_message.image
					? 1
					: //: message.reply_message.seconds < 10 ?
					  2
				//: 3
			),
			{ isAnimated: !!message.reply_message.video, quoted: message.quoted },
			'sticker'
		)
	}
)

bot(
	{
		pattern: 'circle',
		fromMe: fm,
		desc: 'Bild zu einem Kreissticker',
		type: 'sticker',
	},
	async (message, match) => {
		if (!message.reply_message || !message.reply_message.image)
			return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n*Markiere ein Bild.*')
		return await message.send(
			await circleSticker(
				await message.reply_message.downloadAndSaveMediaMessage(
					'circleSticker'
				),
				message.reply_message.video
			),
			{ isAnimated: false, quoted: message.quoted },
			'sticker'
		)
	}
)

bot(
	{
		pattern: 'take ?(.*)',
		fromMe: true,
		desc: 'Stickerpaket ändern',
		type: 'sticker',
	},
	async (message, match) => {
		if (
			!message.reply_message ||
			(!message.reply_message.sticker && !message.reply_message.audio)
		)
			return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n*Markiere einen Sticker oder Audio.*')
		if (message.reply_message.sticker)
			return await message.send(
				await addExif(
					await message.reply_message.downloadMediaMessage('mp4'),
					match
				),
				{ quoted: message.quoted },
				'sticker'
			)
		if (!match)
			return await message.send(
				`⭐   _*Blvck Squad the Bot*_   ⭐\n\n*Gib mir einen titel,artists,link*\n*Aritists oder Link muss nicht umbedingt sein.*`
			)
		const [title, artists, url] = match.split(',')
		return await message.send(
			await addAudioMetaData(
				await message.reply_message.downloadMediaMessage(),
				title,
				artists,
				'',
				url
			),
			{ quoted: message.quoted, mimetype: 'audio/mpeg' },
			'audio'
		)
	}
)

bot(
	{
		pattern: 'mp4',
		fromMe: fm,
		desc: 'Animierte Sticker zu Video',
		type: 'sticker',
	},
	async (message, match) => {
		if (
			!message.reply_message.sticker ||
			!message.reply_message ||
			!message.reply_message.animated
		)
			return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n*Markiere einen animierten Sticker.*')
		return await message.sendFromUrl(
			await webpToMp4(
				await message.reply_message.downloadAndSaveMediaMessage('sticker')
			)
		)
	}
)
