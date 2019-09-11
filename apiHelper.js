const https = require('https')
const fs = require('fs')
const request = require('request')

module.exports = {
    get_system_information : () =>  {
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

    get_stations_information : () => {
      const options = {
        url: process.env.API_GBFS_STATIONS_INFO,
        headers: { 'User-Agent': process.env.APP_NAME + '/' + process.env.VERSION }
      }

      return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
          if (!error && response.statusCode == 200) {
            resolve(response.body)
          }

          if (error) {
            reject(error)
          }
        })

      })
    },

    get_station_status : (id) => {
      const options = {
        url: process.env.API_GBFS_STATIONS_STATUS,
        headers: { 'User-Agent': process.env.APP_NAME + '/' + process.env.VERSION }
      }

      return new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            const result = JSON.parse(response.body)
            result.data.stations.map((item, i) => {
              if (item.station_id == id) {
                resolve(item)
              }
            })
          }

          if (error) {
            reject(error)
          }
        })
      })
    },

    download_file : (url, path) => {
      const options = {
        url: url,
        headers: { 'User-Agent': process.env.APP_NAME + '/' + process.env.VERSION }
      }

      return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(path);

        request(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            file.write(response.body)
            resolve('download file completed. Path: ' + path)
          }
          if (error) {
            reject(error)
          }
        })
      })
    },

    read_file: (path) => {
      return new Promise((resolve, reject) => {
        const file = fs.createReadStream(path);
        let data = ''

        file.on('data', function(chunk) {
            data += chunk
        });

        file.on('end', function() {
            resolve(data)
        });

        file.on('error', function(err) {
            resolve(err)
        });
      })
    }
}
