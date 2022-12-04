const { bot, setWord, getWord, genButtonMessage } = require('../lib')

const actions = ['null', 'warn', 'kick']

bot(
	{
		pattern: 'antiword ?(.*)',
		fromMe: true,
		desc: 'Wortfilter im Gruppenchat',
		onlyGroup: true,
		type: 'group',
	},
	async (message, match) => {
		if (
			!match ||
			(match != 'on' && match != 'off' && !match.startsWith('action'))
		) {
			const { enabled, action } = await getWord(message.jid)
			const buttons = actions
				.filter((e) => e != action)
				.map((button) => ({
					text: button,
					id: `antiword action/${button}`,
				}))
			buttons.push({
				text: enabled ? 'AUS' : 'AN',
				id: `antiword ${enabled ? 'off' : 'on'}`,
			})
			return await message.send(
				await genButtonMessage(
					buttons,
					'⭐   _*Blvck Squad the Bot*_   ⭐\n\nWortfilter im Chat\nBeispiele: antiword on/off\nantiword action/null\nantiword action/warn\nantiword action/kick\nsetvar ANTIWORDS = wort1,wort2,...'
				),
				{},
				'button'
			)
		}
		if (match.startsWith('action/')) {
			const action = match.replace('action/', '')
			if (!actions.includes(action))
				return await message.send(`⭐   _*Blvck Squad the Bot*_   ⭐\n\n_${action} ist eine ungültige Eingabe_🧐`)
			await setWord(message.jid, action)
			return await message.send(`⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Alles klar,der nächste kriegt einen ${action}_🔎`)
		}
		await setWord(message.jid, match == 'on')
		await message.send(
			`⭐️   _*Blvck Squad the Bot*_   ⭐️\n\n_AntiWord ist ${match == 'on' ? 'an' : 'aus'}._😊`
		)
	}
)
