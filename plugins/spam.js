const { bot, setSpam, getSpam, genButtonMessage } = require('../lib')

bot(
	{
		pattern: 'antispam ?(.*)',
		fromMe: true,
		desc: 'Spamschutz',
		onlyGroup: true,
		type: 'group',
	},
	async (message, match) => {
		if (!match || (match != 'on' && match != 'off')) {
			const { enabled } = await getSpam(message.jid)
			return await message.send(
				await genButtonMessage(
					[
						{
							text: enabled ? 'AUS' : 'AN',
							id: `antispam ${enabled ? 'off' : 'on'}`,
						},
					],
					'⭐️   _*Blvck Squad the Bot*_   ⭐️\n\nBeispiel:\nantispam on/off'
				),
				{},
				'button'
			)
		}
		await setSpam(message.jid, match == 'on')
		await message.send(
			`⭐️   _*Blvck Squad the Bot*_   ⭐️\n\n_AntiSpam wurde erfolgreich ${match == 'on' ? 'aktiviert.' : 'deakiviert.'}_`
		)
	}
)
