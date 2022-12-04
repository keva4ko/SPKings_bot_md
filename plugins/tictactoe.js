const {
	bot,
	isTactacToe,
	ticTacToe,
	delTicTacToe,
	genButtonMessage,
	isUser,
	parsedJid,
} = require('../lib/')

bot(
	{
		pattern: 'tictactoe ?(.*)',
		fromMe: true,
		desc: 'TicTacToe Spiel',
		type: 'game',
	},
	async (message, match) => {
		if (match == 'end') {
			await delTicTacToe()
			return await message.send('*SPIEL VORBEI*')
		}
		let [restart, id] = match.split(' ')
		const game = isTactacToe()
		if (game.state)
			return await message.send(
				await genButtonMessage(
					[{ id: 'tictactoe end', text: 'ENDE' }],
					game.text,
					'Wähle eine Zahl von 1 bis 9.'
				),
				{ contextInfo: { mentionedJid: game.mentionedJid } },
				'button'
			)
		let opponent = message.mention[0] || message.reply_message.jid
		let me = message.participant
		const [_me, _opponent] = parsedJid(match)
		if (isUser(_me) && isUser(_opponent)) {
			me = _me
			opponent = _opponent
		}
		if (restart == 'restart' && isUser(id)) {
			opponent = id
			await delTicTacToe()
		}
		if (!opponent || opponent == me)
			return await message.send(
				'*Wähle deinen Gegner*\n*Markiere eine Nachricht oder tictactoe jid1 jid2*'
			)
		const { text } = await ticTacToe(message.jid, me, opponent)
		return await message.send(text, {
			contextInfo: { mentionedJid: [me, opponent] },
		})
	}
)
