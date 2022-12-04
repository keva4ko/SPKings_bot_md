const config = require('../config')
const { bot, setVars, getVars, delVar } = require('../lib/index')
const { restartInstance } = require('../lib/pm2')

if (config.VPS) {
	bot(
		{
			pattern: 'getvar ?(.*)',
			fromMe: true,
			desc: 'ADMINISTRATION Zeigt Var',
			type: 'vps',
		},
		async (message, match) => {
			if (!match) return await message.send(`⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Beispiel:_\ngetvar sudo`)
			const vars = getVars()
			match = match.toUpperCase()
			if (vars[match]) return await message.send(`${match} = ${vars[match]}`)
			return await message.send(`⭐   _*Blvck Squad the Bot*_   ⭐\n\n_${match} nicht in vars gefunden!_`)
		}
	)

	bot(
		{
			pattern: 'delvar ?(.*)',
			fromMe: true,
			desc: 'ADMINISTRATION löscht var',
			type: 'vps',
		},
		async (message, match) => {
			if (!match) return await message.send(`⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Beispiel:_\ndelvar sudo`)
			const vars = getVars()
			match = match.toUpperCase()
			if (!vars[match])
				return await message.send(`⭐   _*Blvck Squad the Bot*_   ⭐\n\n__${match} nicht in vars gefunden!_`)
			delVar(match)
			await message.send(`⭐   _*Blvck Squad the Bot*_   ⭐\n\n__${match} wurde gelöscht!_`)
			restartInstance()
		}
	)

	bot(
		{
			pattern: 'setvar ?(.*)',
			fromMe: true,
			desc: 'ADMINISTRATION setzt var',
			type: 'vps',
		},
		async (message, match) => {
			const keyValue = match.split('=')
			if (!match || keyValue.length < 2)
				return await message.send(`⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Beispiel:_\nsetvar sudo = 91987653210`)
			setVars({ [keyValue[0].trim().toUpperCase()]: keyValue[1].trim() })
			await message.send(`⭐   _*Blvck Squad the Bot*_   ⭐\n\n_Var ${keyValue[0].toUpperCase()} wurde hinzugefügt!_`)
			restartInstance()
		}
	)

	bot(
		{
			pattern: 'allvar ?(.*)',
			fromMe: true,
			desc: 'ADMINISTRATION Zeigt alle Vars',
			type: 'vps',
		},
		async (message, match) => {
			const vars = getVars()
			let allVars = ''
			for (const key in vars) {
				allVars += `${key} = ${vars[key]}\n\n`
			}
			return await message.send(allVars.trim())
		}
	)
}
