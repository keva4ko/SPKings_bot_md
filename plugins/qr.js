const { bot } = require('../lib/')
const jimp = require('jimp')
const QRReader = require('qrcode-reader')

bot(
	{ pattern: 'qr ?(.*)', fromMe: true, desc: 'Read/Write Qr.', type: 'misc' },
	async (message, match) => {
		if (match)
			return await message.sendFromUrl(
				`https://levanter-qr.vercel.app/gqr?text=${encodeURIComponent(match)}`
			)
		if (!message.reply_message || !message.reply_message.image)
			return await message.send(
				'⭐   _*Blvck Squad the Bot*_   ⭐\n\n*Beispiel: qr test*\n*Antworte auf einen Bild um QR zu erstellen.*'
			)

		const { bitmap } = await jimp.read(
			await message.reply_message.downloadMediaMessage()
		)
		const qr = new QRReader()
		qr.callback = (err, value) =>
			message.send(err ?? value.result, { quoted: message.data })
		qr.decode(bitmap)
	}
)
