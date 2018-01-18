const qiniu = require('node-qiniu');
const stream = require('stream');
const qiniuConfig = require('../config/techmeme-backend-config.js').qiniu;
const debug = require('debug')('techmeme-backend:qiniu');

qiniu.config({
  access_key: qiniuConfig.ak,
  secret_key: qiniuConfig.sk,
});

const PRODUCTION = process.env.NODE_ENV === 'production';

const bucket = PRODUCTION ? qiniuConfig.bucket : 'test';

const imagesBucket = qiniu.bucket(bucket);

function upLoadFile(imageName, buffer) {
  const promise = new Promise((resolve, reject) => {
    const puttingStream = imagesBucket.createPutStream(imageName);
    const bufferStream = new stream.PassThrough();
    bufferStream.end(buffer);
    bufferStream
      .pipe(puttingStream)
      .on('error', (err) => {
        debug(err);
        reject(err);
      })
      .on('end', (reply) => {
        resolve(reply);
      });
  });
  return promise;
}

module.exports = upLoadFile;
