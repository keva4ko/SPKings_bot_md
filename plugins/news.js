const { bot, genListMessage, getJson } = require('../lib/')

bot(
	{
		pattern: 'news ?(.*)',
		fromMe: true,
		desc: 'Malayalam Nachrichten',
		type: 'misc',
	},
	async (message, match) => {
		if (!match) {
			const { result } = await getJson('https://levanter-qr.vercel.app/news')
			return await message.send(
				genListMessage(
					result.map(({ title, url, time }) => ({
						text: title,
						id: `news ${url}`,
						desc: time,
					})),
					result.map(({ title }) => title).join('\n\n'),
					'LESEN'
				),
				{},
				'list'
			)
		}
		if (match.startsWith('http')) {
			const { result } = await getJson(
				`https://levanter-qr.vercel.app/news?url=${match}`
			)
			return await message.send(result, { quoted: message.data })
		}
	}
)
