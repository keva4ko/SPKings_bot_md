const {
	enableGreetings,
	setMessage,
	deleteMessage,
	bot,
	getMessage,
	genButtonMessage,
	greetingsPreview,
	clearGreetings,
} = require('../lib/')

bot(
	{
		pattern: 'welcome ?(.*)',
		fromMe: true,
		desc: 'Willkommensgruß an die Neuen',
		onlyGroup: true,
		type: 'group',
	},
	async (message, match) => {
		const welcome = await getMessage(message.jid, 'welcome')
		if (!match && !welcome)
			return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\nSendet einen personalisierten Willkommensgruß an die neuen Mitglieder\nBeispiel:\nwelcome Hi &mention')
		if (!match) {
			await message.send(welcome.message)
			const onOrOff = welcome && welcome.enabled ? 'off' : 'on'
			const button = await genButtonMessage(
				[{ id: `welcome ${onOrOff}`, text: onOrOff.toUpperCase() }],
				'⭐   _*Blvck Squad the Bot*_   ⭐\n\nBeispiel:\nwelcome Hi &mention, willkommen zu &name,&disc,&size/257 Mitglieder.',
				'Welcome'
			)
			return await message.send(button, {}, 'button')
			// return await message.send(
			// 	await genHydratedButtons(
			// 		[
			// 			{
			// 				urlButton: {
			// 					text: 'Beispiel',
			// 					url: 'https://github.com/lyfe00011//whatsapp-bot-md/wiki/Greetings',
			// 				},
			// 			},
			// 			{ button: { id: 'welcome an', text: 'AN' } },
			// 			{ button: { id: 'welcome aus', text: 'AUS' } },
			// 		],
			// 		'Welcome'
			// 	),
			// 	{},
			// 	'template'
			// )
		}
		if (match == 'on' || match == 'off') {
			if (!welcome) return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\nBeispiel:\nwelcome Hi &mention')
			await enableGreetings(message.jid, 'welcome', match)
			return await message.send(
				`⭐️   _*Blvck Squad the Bot*_   ⭐️\n\n_Willkommensgrüße wurde ${match == 'on' ? 'aktiviert' : 'deaktiviert'}._😊`
			)
		}
		if (match === 'delete') {
			await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Willkommensgruß gelöscht_')
			clearGreetings(message.jid, 'welcome')
			return await deleteMessage(message.jid, 'welcome')
		}
		await setMessage(message.jid, 'welcome', match)
		const { msg, options, type } = await greetingsPreview(message, 'welcome')
		await message.send(msg, options, type)
		return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Willkommensgruß gesetzt_')
	}
)

bot(
	{
		pattern: 'goodbye ?(.*)',
		fromMe: true,
		desc: 'Abschied',
		onlyGroup: true,
		type: 'group',
	},
	async (message, match) => {
		const welcome = await getMessage(message.jid, 'goodbye')
		if (!match && !welcome)
			return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\nBeispiel:\ngoodbye Tschüss &mention')
		if (!match) {
			await message.send(welcome.message)
			const onOrOff = welcome && welcome.enabled ? 'aus' : 'an'
			const button = await genButtonMessage(
				[{ id: `welcome ${onOrOff}`, text: onOrOff.toUpperCase() }],
				'Beispiel:\nhttps://github.com/lyfe00011//whatsapp-bot-md/wiki/Greetings',
				'Goodbye'
			)
			return await message.send(button, {}, 'button')
			// return await message.send(
			// 	await genHydratedButtons(
			// 		[
			// 			{
			// 				urlButton: {
			// 					url: 'https://github.com/lyfe00011/whatsapp-bot-md/wiki/Greetings',
			// 					text: 'Beispiel',
			// 				},
			// 			},
			// 			{
			// 				button: { id: 'goodbye an', text: 'AN' },
			// 			},
			// 			{ button: { id: 'goodbye AUS', text: 'AUS' } },
			// 		],
			// 		'Goodbye'
			// 	),
			// 	{},
			// 	'template'
			// )
		}
		if (match == 'on' || match == 'off') {
			if (!welcome)
				return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\nBeispiel:\ngoodbye Tschüss #mention')
			await enableGreetings(message.jid, 'goodbye', match)
			return await message.send(
				`⭐️   _*Blvck Squad the Bot*_   ⭐️\n\n_Abschiede an Mitglieder wurde ${match == 'on' ? 'aktiviert' : 'deaktiviert'}._😊`
			)
		}
		if (match === 'delete') {
			await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Abschied wurde gelöscht_')
			clearGreetings(message.jid, 'goodbye')
			return await deleteMessage(message.jid, 'goodbye')
		}
		await setMessage(message.jid, 'goodbye', match)
		const { msg, options, type } = await greetingsPreview(message, 'goodbye')
		await message.send(msg, options, type)
		return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Abschied wurde gesetzt_')
	}
)
