const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const app = express()
const request = require('request')

app.use(cors())
dotenv.config()

var apiHelper = require('./apiHelper')

app.listen(process.env.PORT, () => {
 console.log('Server running on port' + process.env.PORT)
})

// download all station informations
app.get('/download-stations/:lang', (req, res, next) => {

  const lang = req.params.lang ? req.params.lang : process.env.DEFAULT_LANG

  const errHandler = function(err) {
    console.log(err)
    res.send(error)
  }

  systemInfoPromise = apiHelper.get_system_information()
    .then(JSON.parse, errHandler)
    .then(function(result) {
      const sysName = result.data.name
      const fileName = './datas/stations_' + sysName + '_' + lang + '.json'

      apiHelper.download_file(process.env.API_GBFS_STATIONS_INFO, fileName)
        .then(response => {
            console.log(response)
            res.send(response)
        }, errHandler)
    }, errHandler)
})
