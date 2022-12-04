const { bot, apkMirror, genListMessage, genButtonMessage } = require('../lib')
bot(
	{
		pattern: 'apk ?(.*)',
		fromMe: true,
		desc: 'Apks aus apkmirror herunterladen',
		type: 'download',
	},
	async (message, match) => {
		if (!match) return await message.send('⭐   _*Blvck Squad the Bot*_   ⭐\n\nLädt Apps aus Apkmirror herunter.\nBeispiel: apk [Link]')
		const { result, status } = await apkMirror(match)
		if (status > 400) {
			if (!result.length)
				return await message.send(
					'⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Dein Link führt mich zu nichts_🤷‍♂️'
				)
			const list = []
			for (const { title, url } of result)
				list.push({ id: `apk ${status};;${url}`, text: Name })
			return await message.send(
				genListMessage(list, 'Gefundene Apps', 'DOWNLOAD'),
				{},
				'list'
			)
		}
		if (status > 200) {
			const button = []
			for (const apk in result)
				button.push({
					id: `apk ${status};;${result[apk].url}`,
					text: result[apk].title,
				})
			return await message.send(
				await genButtonMessage(button, 'Verfügbare Links'),
				{},
				'button'
			)
		}
		return await message.sendFromUrl(result)
	}
)
