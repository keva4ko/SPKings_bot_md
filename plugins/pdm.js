const { bot, setPdm, genButtonMessage } = require('../lib/')

bot(
	{
		pattern: 'pdm ?(.*)',
		fromMe: true,
		desc: 'Nachricht wenn Admin vergeben wird',
		type: 'group',
		onlyGroup: true,
	},
	async (message, match) => {
		if (!match)
			await message.send(
				await genButtonMessage(
					[
						{ id: 'pdm on', text: 'AN' },
						{ id: 'pdm off', text: 'AUS' },
					],
					'⭐️   _*Blvck Squad the Bot*_   ⭐️\n\nNachricht wenn Admin verteilt wird'
				),
				{},
				'button'
			)
		if (match == 'on' || match == 'off') {
			await setPdm(message.jid, match)
			await message.send(
				`⭐️   _*Blvck Sqaud the Bot*_   ⭐️\n\n_PDM ist ${match == 'on' ? 'an' : 'aus'}._😊`
			)
		}
	}
)
