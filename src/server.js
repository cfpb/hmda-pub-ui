const http = require('http')
const msaToName = require('./constants/msaToName.js')
const spawn = require('child_process').spawn

http
  .createServer(function(req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
    let url = 's3:/' + req.url
    if (url[url.length - 1] !== '/') url += '/'
    const splitUrl = url.split('/')
    const urlPieces = splitUrl.length
    console.log(splitUrl, urlPieces)
    let awk
    if (urlPieces === 9) {
      awk = spawn('awk', ['BEGIN{RS="/\\n"}{print $2}'])
    } else {
      return res.end('"invalid request"')
    }

    const aws = spawn('aws', ['s3', 'ls', url])
    aws.stdout.pipe(awk.stdin)
    let str = ''
    awk.stdout.on('data', d => (str += d))
    awk.stdout.on('end', () => {
      const year = splitUrl[6]
      const instId = splitUrl[7]
      const msas = str.split('\n').slice(0, -1)
      const output = {
        year: year,
        institution: {
          name: 'someName',
          id: instId,
          respondentId: 'respo'
        },
        msaMds: msas.map(msa => {
          return {
            id: msa,
            name: msaToName[msa]
          }
        })
      }

      res.end(JSON.stringify(output))
    })
  })
  .listen(1337)
