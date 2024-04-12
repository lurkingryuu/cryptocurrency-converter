const http = require('node:http')
const { port, host } = require('../config/config')

const options = { hostname: host, port: port, path: '/ping', method: 'GET' }

http.request(options, (res) => {
    let body = ''

    res.on('data', (chunk) => {
        body += chunk
    })

    res.on('end', () => {
        if (res.statusCode === 200) {
            console.log('Healthcheck passed')
            process.exit(0)
        } else {
            console.log('Healthcheck failed')
            process.exit(1)
        }
    })
})
    .on('error', (err) => {
        console.log('Error: ', err)
        process.exit(1)
    })
    .end()
