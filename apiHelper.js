const https = require('https')
const fs = require('fs')
const request = require('request')

module.exports = {
    get_system_information : function() {
      const options = {
        url: process.env.API_GBFS_SYS_INFO,
        headers: { 'User-Agent': process.env.APP_NAME + '/' + process.env.VERSION }
      }

      return new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            resolve(response.body);
          }
          if (error) {
            reject(error)
          }
        })

      })
    },

    get_stations_information : function() {
      const options = {
        url: process.env.API_GBFS_STATIONS_INFO,
        headers: { 'User-Agent': process.env.APP_NAME + '/' + process.env.VERSION }
      }

      return new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            resolve(response.body)
          }

          if (error) {
            reject(error)
          }
        })

      })
    },

    download_file : function(url, path) {
      return new Promise((resolve, reject) => {
        let file = fs.createWriteStream(path);
        https.get(url, function(response) {
          response.on('data', function(chunk) {
            file.write(chunk)
          })
          response.on('end', function() {
            resolve('download file completed. Path: ' + path)
          })
          response.on('error', function(err) {
            reject(err)
          })
        })
      })
    }
}
