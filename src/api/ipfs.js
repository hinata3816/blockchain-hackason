var ipfsClient = require('ipfs-http-client')
var ipfs = ipfsClient('localhost', '5001', { protocol: 'http' })
var toBuffer = require('blob-to-buffer')

export function uploadFile(blob) {
  return new Promise((reslove, reject) => {
    toBuffer(blob, (err, buffer) => {
      if (err) throw err
      ipfs.add({
        path: `/${blob.name}`,
        content: buffer
      }, {
        wrapWithDirectory: true
      }, (err, res) => {
        if (err) throw err
        reslove(res)
      })
    })
  })
}
