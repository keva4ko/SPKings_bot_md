const { bot, tts } = require('../lib/')
const config = require('../config')
bot(
	{
		pattern: 'tts ?(.*)',
		fromMe: false,
		desc: 'Text zu Sprache',
		type: 'misc',
	},
	async (message, match) => {
		match = match || message.reply_message.text
		if (!match)
			return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Beispiel:_\ntts Hi\ntts Hi {ml}')
		let LANG = config.LANG
		const lang = match.match('\\{([a-z]+)\\}')
		if (lang) {
			match = match.replace(lang[0], '')
			LANG = lang[1]
		}
		await message.send(
			await tts(LANG, match),
			{ ptt: true, mimetype: 'audio/ogg; codecs=opus' },
			'audio'
		)
	}
)
