const http = require('http')

const server = http.createServer()

server.on('request', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.end('hello axios')
})

server.listen(3000, function() {
    console.log('server is running...')
})