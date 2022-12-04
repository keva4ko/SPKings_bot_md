const config = require('../config')
const { bot, isUrl } = require('../lib/')

bot(
	{
		pattern: 'ss ?(.*)',
		fromMe: true,
		desc: 'Screenshot einer Webseite',
		type: 'download',
	},
	async (message, match) => {
		if (!config.SS_TOKEN)
			return await message.send(
				'⭐️   _*Blvck Squad the Bot*_   ⭐️\n\nSetz deinen SS_TOKEN:dein_token aus https://app.screenshotapi.net/dashboard'
			)
		match = isUrl(match || message.reply_message.text)
		if (!match) return await message.send('⭐️   _*Blvck Squad the Bot*_   ⭐️\n\n_Beispiel: ss [Link]_')
		await message.sendFromUrl(
			`https://shot.screenshotapi.net/screenshot?token=${
				config.SS_TOKEN
			}&url=${encodeURIComponent(
				match
			)}&width=1366&height=768&output=image&file_type=png&block_ads=true&no_cookie_banners=true&dark_mode=true&wait_for_event=networkidle`
		)
	}
)

bot(
	{
		pattern: 'fullss ?(.*)',
		fromMe: true,
		desc: 'Screenshot einer Webseite',
		type: 'download',
	},
	async (message, match) => {
		if (!config.SS_TOKEN)
			return await message.send(
				'⭐️   _*Blvck Squad the Bot*_   ⭐️\n\nSetz deinen SS_TOKEN:dein_token aus https://app.screenshotapi.net/dashboard'
			)
		match = isUrl(match || message.reply_message.text)
		if (!match) return await message.send('⭐️   _*Blvck Squad the Bot*_   ⭐️\n\n_Beispiel: fullss [Link]_')
		await message.sendFromUrl(
			`https://shot.screenshotapi.net/screenshot?token=${
				config.SS_TOKEN
			}&url=${encodeURIComponent(
				match
			)}&width=1366&height=768&full_page=true&output=image&file_type=png&block_ads=true&no_cookie_banners=true&dark_mode=true&wait_for_event=networkidle`
		)
	}
)
