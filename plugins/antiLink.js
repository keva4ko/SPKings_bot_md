const { getAntiLink, bot, genButtonMessage, setAntiLink } = require('../lib/')

bot(
	{
		pattern: 'antilink ?(.*)',
		fromMe: true,
		desc: 'Kick bei Links',
		type: 'group',
		onlyGroup: true,
	},
	async (message, match) => {
		const antilink = await getAntiLink(message.jid)
		if (!match) {
			const onOrOff = antilink.enabled ? 'off' : 'on'
			const button = await genButtonMessage(
				[
					{ id: 'antilink info', text: 'INFO' },
					{ id: `antilink ${onOrOff}`, text: onOrOff.toUpperCase() },
				],
				'⭐   _*Blvck Squad the Bot*_   ⭐\n\nKickt Mitglieder beim versenden verbotener Links.\nBeispiel:\nantilink on/off\nantilink action/warm\antilink action/kick\nantilink action/null\nantilink fb.com,facebook.com,twitter.com\nantilink !fb.com,!facebook.com,!twitter.com',
				'Antilink'
			)
			return await message.send(button, {}, 'button')
			// return await message.send(
			// 	await genHydratedButtons(
			// 		[
			// 			{
			// 				urlButton: {
			// 					text: 'Beispiel',
			// 					url: 'https://github.com/lyfe00011/whatsapp-bot-md/wiki/antilink',
			// 				},
			// 			},
			// 			{
			// 				button: {
			// 					id: `antilink ${antilink.enabled ? 'aus' : 'an'}`,
			// 					text: antilink.enabled ? 'AUS' : 'AN',
			// 				},
			// 			},
			// 			{ button: { id: 'antilink info', text: 'INFO' } },
			// 		],
			// 		'AntiLink'
			// 	),
			// 	{},
			// 	'template'
			// )
		}
		if (match == 'on' || match == 'off') {
			if (match == 'off' && !antilink)
				return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\nAntiLink ist noch deaktiviert.\nAktivere es mit antilink on.')
			await setAntiLink(message.jid, match == 'on')
			return await message.send(
				`⭐️   _*Blvck Squad the Bot*_   ⭐️\n\nAlles klar, _AntiLink_ ist ${match == 'on' ? 'aktiviert.' : 'deaktiviert.'}😊`
			)
		}
		if (match == 'info')
			return await message.send(
				`⭐️   _*Blvck Squad the Bot*_   ⭐️\n\nAntiLink ist ${antilink.enabled ? 'an' : 'aus'}\n*Erlaubte Links:* ${
					antilink.allowedUrls
				}\n*Modus:* ${antilink.action}`
			)
		if (match.startsWith('action/')) {
			await setAntiLink(message.jid, match)
			const action = match.replace('action/', '')
			if (!['warn', 'kick', 'null'].includes(action))
				return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Deine Eingabe kann ich nicht umsetzen😓_')
			return await message.send(`⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Okay der nächste bekommt einen ${action}._`)
		}
		await setAntiLink(message.jid, match)
		return await message.send(`⭐   _*Blvck Squad the Bot*_   ⭐\n\nErlaubte Links: ${match}`)
	}
)
