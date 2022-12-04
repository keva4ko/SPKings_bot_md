const {
	bot,
	getFake,
	antiList,
	enableAntiFake,
	genButtonMessage,
} = require('../lib/')

bot(
	{
		pattern: 'antifake ?(.*)',
		fromMe: true,
		desc: 'Filter für Nummern',
		type: 'group',
		onlyGroup: true,
	},
	async (message, match) => {
		if (!match) {
			const fake = await getFake(message.jid)
			const onOrOff = fake && fake.enabled ? 'off' : 'on'
			const button = await genButtonMessage(
				[
					{ id: 'antifake list', text: 'LIST' },
					{ id: `antifake ${onOrOff}`, text: onOrOff.toUpperCase() },
				],
				'⭐   _*Blvck Squad the Bot*_   ⭐\n\nKickfilter für unerlaubte Nummern\nBeispiel:\nantifake on/off\nantifake 1,993,46\nantifake !49,!43',
				'Antifake'
			)
			return await message.send(button, {}, 'button')
			// return await message.send(
			// 	await genHydratedButtons(
			// 		[
			// 			{
			// 				urlButton: {
			// 					text: 'Beispiel:',
			// 					url: 'https://github.com/lyfe00011/whatsapp-bot-md/wiki/antifake',
			// 				},
			// 			},
			// 			{ button: { id: 'antifake list', text: 'LISTE' } },
			// 			{ button: { id: 'antifake on', text: 'AN' } },
			// 			{ button: { id: 'antifake off', text: 'AUS' } },
			// 		],
			// 		'Antifake'
			// 	),
			// 	{},
			// 	'template'
			// )
		}
		if (match == 'list') {
			let list = ''
			let codes = await antiList(message.jid, 'fake')
			await message.send(codes.join(','))
			codes.forEach((code, i) => {
				list += `${i + 1}. ${code}\n`
			})
			return await message.send('```' + list + '```')
		}
		if (match == 'on' || match == 'off') {
			await enableAntiFake(message.jid, match)
			return await message.send(
				`⭐   _*Blvck Squad the Bot*_   ⭐\n\n_AntiFake ist ${match == 'on' ? 'an' : 'aus'}_😊`
			)
		}
		await enableAntiFake(message.jid, match)
		return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Alles klar, wird gemacht!_🫡')
	}
)
