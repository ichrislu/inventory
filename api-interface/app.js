const path = require('path')
const express = require('express')
const mockjs = require('express-mockjs')

const port = 8090
const app = express()
const server = http.createServer(app)

app.use('/api', mockjs(path.join(__dirname, 'mocks')))

server.listen(port)
server.on('listening', () => {
    console.log('Listenling on http://localhost:${port}/api');
})
