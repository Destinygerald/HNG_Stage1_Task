const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(cors({
	origin: "*",
	credential: true
}))


app.get('/api/hello', async(req, res) => {
	try {

		const { visitor_name } = req.query

		const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

		const resData = {
			location: ""
		}

		if (!ip) {
			return res.status(400).json({
				message: "Bad request"
			})
		}

		await fetch(`https://api.geoapify.com/v1/ipinfo?ip=${ip}&apiKey=${process.env.API_KEY}`)  
		  .then(response => response.json())
		  .then(data => {
		  	resData.location = data?.city?.name
		  })

		return res.status(200).json({
			client_ip: ip,
			location: resData?.location,
			greeting: `Hello ${visitor_name}!, the temperature is 11 degrees Celcius in ${resData.location}`
		})

	} catch (err) {
		return res.status(500).json({
			message: err.message
		})
	}
})




app.listen(PORT, () => {
	console.log(`Port running on Port ${PORT}`)
})