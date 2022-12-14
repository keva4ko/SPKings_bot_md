const {
	bot,
	isAdmin,
	setMute,
	addTask,
	genButtonMessage,
	c24to12,
	getMute,
} = require('../lib')

bot(
	{
		pattern: 'amute ?(.*)',
		fromMe: true,
		desc: 'Gruppenchat Zeitschalter',
		type: 'group',
		onlyGroup: true,
	},
	async (message, match) => {
		const participants = await message.groupMetadata(message.jid)
		const isImAdmin = await isAdmin(participants, message.client.user.jid)
		if (!isImAdmin) return await message.send(`⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Ich bin kein Admin_`)
		let msg = message.reply_message.text || 'null'
		const [hour, min] = match.split(' ')
		if (hour == 'info') {
			const task = await getMute(message.jid, 'mute')
			if (!task) return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_AutoMute nicht gefunden🤷‍_')
			const { hour, minute, msg, enabled } = task
			return await message.send(
				`*Stunden:* ${hour}\n*Minute:* ${minute}\n*Zeit:* ${c24to12(
					`${hour}:${minute}`
				)}\n*Mute:* ${enabled ? 'an' : 'aus'}\nMessage : ${msg}`
			)
		}
		if (hour == 'an' || hour == 'aus') {
			const isMute = await setMute(message.jid, 'mute', hour == 'on')
			if (!isMute) return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_AutoMute nicht gefunden_🤷')
			const task = await getMute(message.jid, 'mute')
			if (!task || !task.hour)
				return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_AutoMute nicht gefunden_🤷')
			const isTask = addTask(
				message.jid,
				'mute',
				hour == 'off' ? 'off' : task.hour,
				task.minute,
				message.client,
				task.msg
			)
			if (!isTask)
				return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_AutoMute ist schon aus_')
			return await message.send(
				`⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Ich habe AutoMute ${hour == 'on' ? 'aktiviert' : 'deaktiviert'}._😁`
			)
		}
		if (!hour || !min || isNaN(hour) || isNaN(min))
			return await message.send(
				await genButtonMessage(
					[
						{ id: 'amute an', text: 'AN' },
						{ id: 'amute aus', text: 'AUS' },
						{ id: 'amute info', text: 'INFO' },
					],
					'⭐   _*Blvck Squad the Bot*_   ⭐\n\nBeispiel:\namute 6 0\namute info\namute an/aus\nMarkiere eine Nachricht'
				),
				{},
				'button'
			)
		await setMute(message.jid, 'mute', true, hour, min, msg)
		addTask(message.jid, 'mute', hour, min, message.client, msg)

		return await message.send(
			`_Group will Mute at ${c24to12(`${hour}:${min}`)}_${
				msg != 'null' ? `\n_Message: ${msg}_` : ''
			}`
		)
	}
)

bot(
	{
		pattern: 'aunmute ?(.*)',
		fromMe: true,
		desc: 'Gruppenunmute Zeitschalter',
		type: 'group',
		onlyGroup: true,
	},
	async (message, match) => {
		const participants = await message.groupMetadata(message.jid)
		const isImAdmin = await isAdmin(participants, message.client.user.jid)
		if (!isImAdmin) return await message.send(`⭐   _*Blvck Squad the Bot*_   ⭐\n\nIch bin kein Admin.`)
		let msg = message.reply_message.text || 'null'
		const [hour, min] = match.split(' ')
		if (hour == 'info') {
			const task = await getMute(message.jid, 'unmute')
			if (!task || !task.hour)
				return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_AutoUnMute nicht gefunden_')
			const { hour, minute, msg, enabled } = task
			return await message.send(
				`*Stunde:* ${hour}\n*Minute:* ${minute}\n*Zeit:* ${c24to12(
					`${hour}:${minute}`
				)}\n*unMute :* ${enabled ? 'on' : 'off'}\nNachricht: ${msg}`
			)
		}
		if (hour == 'on' || hour == 'off') {
			const isMute = await setMute(message.jid, 'unmute', hour == 'on')
			if (!isMute) return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Ich habe AutoUnMute nicht gefunden._😕')
			const task = await getMute(message.jid, 'unmute')
			if (!task) return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Ich habe AutoUnMute nicht gefunden._😕')
			const isTask = addTask(
				message.jid,
				'unmute',
				hour == 'off' ? 'off' : task.hour,
				task.minute,
				message.client,
				task.msg
			)
			if (!isTask)
				return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\n_AutoUnMute ist schon aus._')
			return await message.send(
				`⭐   _*Blvck Squad the Bot*_   ⭐\n\n_AutoUnMute ist ${hour == 'on' ? 'aktiviert' : 'deaktiviert'}._`
			)
		}
		if (!hour || !min || isNaN(hour) || isNaN(min))
			return await message.send(
				await genButtonMessage(
					[
						{ id: 'aunmute on', text: 'AN' },
						{ id: 'aunmute off', text: 'AUS' },
						{ id: 'aunmute info', text: 'INFO' },
					],
					'*Example : aunmute 6 0*\naunmute info\naunmute on/off\nReply to a text to set Msg'
				),
				{},
				'button'
			)
		await setMute(message.jid, 'unmute', true, hour, min, msg)
		addTask(message.jid, 'unmute', hour, min, message.client, msg)
		return await message.send(
			`⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Gruppe wird unMute in ${c24to12(`${hour}:${min}`)}_${
				msg != 'null' ? `\n_Nachricht: ${msg}_` : ''
			}`
		)
	}
)
