const { bot, buttonMessage } = require('../lib')

bot(
	{
		pattern: 'button ?(.*)',
		fromMe: true,
		desc: 'Knopf',
		type: 'whatsapp',
	},
	async (message, match) => {
		match = match.split(',')
		if (match.length < 3)
			return await message.send(
				'⭐   _*Blvck Squad the Bot*_   ⭐\n\nDu kannst Knöpfe an deinem Text anhängen.\nBeispiel:\nbutton Kopfzeile,Fußzeile,Knopf1,Knopf2,...\nAntworte auf einen Bild, Video oder Dokument.'
			)
		await message.send(await buttonMessage(match, message), {}, 'button')
	}
)
