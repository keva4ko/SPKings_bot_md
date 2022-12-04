const { bot } = require('../lib/')
const { restartInstance } = require('../lib/pm2')
bot(
	{
		pattern: 'reboot ?(.*)',
		fromMe: true,
		desc: 'ADMINISTRATION restart with pm2',
		type: 'misc',
	},
	async (message, match) => {
		await message.send(`⭐️   _*Blvck Squad the Bot*_   ⭐️\n\n_Ich starte neu, gib mir ne Minute._⏳`)
		restartInstance()
	}
)
