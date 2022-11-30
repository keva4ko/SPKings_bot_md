const { bot, getJson, getFloor } = require('../lib/')
const moment = require('moment')
bot(
	{
		pattern: 'weather ?(.*)',
		fromMe: true,
		desc: 'Wetter',
		type: 'search',
	},
	async (message, match) => {
		if (!match) return await message.send('*Beispiel: weather München*')
		const data = await getJson(
			`http://api.openweathermap.org/data/2.5/weather?q=${match}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=en`
		).catch(() => {})
		if (!data) return await message.send(`_${match} nicht gefunden_`)
		const { name, timezone, sys, main, weather, visibility, wind } = data
		const degree = [
			'N',
			'NNE',
			'NE',
			'ENE',
			'E',
			'ESE',
			'SE',
			'SSE',
			'S',
			'SSW',
			'SW',
			'WSW',
			'W',
			'WNW',
			'NW',
			'NNW',
		][getFloor(wind.deg / 22.5 + 0.5) % 16]
		return await message.send(
			`*Name:* ${name}\n*Land:* ${sys.country}\n*Wetter:* ${
				weather[0].description
			}\n*Temperatur:* ${getFloor(main.temp)}°\n*Gefühlt:* ${getFloor(
				main.feels_like
			)}°\n*Feuchtigkeit:* ${
				main.humidity
			}%\n*Sichtweite:* ${visibility}m\n*Wind*: ${
				wind.speed
			}m/s ${degree}\n*Sonnenaufgang:* ${moment
				.utc(sys.sunrise, 'X')
				.add(timezone, 'seconds')
				.format('hh:mm a')}\n*Sonnenuntergang:* ${moment
				.utc(sys.sunset, 'X')
				.add(timezone, 'seconds')
				.format('hh:mm a')}`
		)
	}
)
