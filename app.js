const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(cors())

app.listen(process.env.PORT, () => {
 console.log('Server running on port' + process.env.PORT)
})

app.get('/download', (req, res, next) => {
  const request = require('request')

  const options = {
    url: process.env.API_GBFS,
    headers: { 'User-Agent': process.env.APP_NAME + '/' + process.env.VERSION }
  }

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const resData = JSON.parse(body)
      res.send(resData)
    }
    if (error) {
      res.send(error)
    }
  })
})
