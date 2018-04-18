const http = require('http')
const spawn = require('child_process').spawn

http
  .createServer(function(req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')

    if (req.url.match(/.txt$/))
      return http.get('http://s3.amazonaws.com' + req.url, r => {
        r.pipe(res)
      })
    let url = 's3:/' + req.url
    if (url[url.length - 1] !== '/') url += '/'
    const urlPieces = url.split('/').length
    let awk
    if (urlPieces === 9) {
      awk = spawn('awk', ['BEGIN{RS="/\\n"}{print $2}'])
    } else if (urlPieces === 10) {
      awk = spawn('awk', ['{print $4}'])
    } else {
      return res.end('"invalid request"')
    }

    const aws = spawn('aws', ['s3', 'ls', url])
    aws.stdout.pipe(awk.stdin)
    let str = ''
    awk.stdout.on('data', d => (str += d))
    awk.stdout.on('end', () => {
      res.end(JSON.stringify(str.split('\n').slice(0, -1)))
    })
  })
  .listen(1337)
