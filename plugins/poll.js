const { bot } = require('../lib/')

bot(
	{
		pattern: 'poll ?(.*)',
		fromMe: true,
		desc: 'Abstimmung starten',
		type: 'whatsapp',
	},
	async (message, match) => {
		const poll = match.split(',')
		if (poll.length < 3)
			return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\nAbstimmung starten\n*Beispiel: poll frage,option1,option2,...*')
		const name = poll[0]
		const options = []
		for (let i = 1; i < poll.length; i++) options.push({ optionName: poll[i] })
		await message.send(
			{
				name,
				options,
				selectableOptionsCount: options.length,
			},
			{},
			'poll'
		)
	}
)
