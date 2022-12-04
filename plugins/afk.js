const { bot } = require('../lib/')

global.AFK = {
	isAfk: false,
	reason: false,
	lastseen: 0,
}

bot(
	{
		pattern: 'afk ?(.*)',
		fromMe: true,
		desc: 'Bot geht afk',
		type: 'misc',
	},
	async (message, match) => {
		if (!global.AFK.isAfk && !match)
			return await message.send(
				'⭐   _*Blvck Squad the Bot*_   ⭐\n\nSetzt den Bot auf AFK.\nBeispiel:\nafk [Abwesenheitsnachricht] #zuletztgesehen'
			)
		if (!global.AFK.isAfk) {
			if (match) global.AFK.reason = match
			global.AFK.isAfk = true
			global.AFK.lastseen = Math.round(new Date().getTime() / 1000)
			return await message.send(
				match.replace(
					'#zuletztgesehen',
					Math.round(new Date().getTime() / 1000) - global.AFK.lastseen
				)
			)
		}
	}
)
