const { bot, removeBg } = require('../lib')
const config = require('../config')
bot(
	{
		pattern: 'rmbg',
		fromMe: true,
		desc: 'Entfernt Hintergrund vom Bild',
		type: 'misc',
	},
	async (message, match) => {
		if (config.RMBG_KEY == 'null')
			return await message.send(`1. Erstelle einen Konto bei remove.bg
    2. Verifiziere dein Konto.
    3. Kopiere deinen Key.
    4. .setvar RMBG_KEY:kopierte_Key
    .......................
    
    Beispiel => .setvar RMBG_KEY:GWQ6jVy9MBpfYF9SnyG8jz8P
          
    Um es einfacher zu machen 
    Geh auf den SIGNUP LINK und wähle Google aus
    nach der Registrierung
    Klick KEY LINK und kopiere deinen KEY.(Press show BUTTON)
    
    SIGNUP LINK : https://accounts.kaleido.ai/users/sign_up 
    
    KEY LINK : https://www.remove.bg/dashboard#api-key`)
		if (!message.reply_message || !message.reply_message.image)
			return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n*Markiere einen Bild.*')
		const buffer = await removeBg(
			await message.reply_message.downloadAndSaveMediaMessage('rmbg'),
			config.RMBG_KEY
		)
		if (typeof buffer == 'string')
			return await message.send(buffer, { quoted: message.data })
		return await message.send(
			buffer,
			{ quoted: message.quoted, mimetype: 'image/png' },
			'image'
		)
	}
)
