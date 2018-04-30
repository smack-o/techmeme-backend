const User = require('../models/backendUser');
const { sessionSecret } = require('../utils');

const crypto = require('crypto');


function encode(password) {
  const cipher = crypto.createCipher('aes-256-cbc', sessionSecret);
  let crypted = cipher.update(password, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}
// console.log(encode('test'));
function decode(encrypted) {
  const decipher = crypto.createDecipher('aes-256-cbc', sessionSecret);
  let dec = decipher.update(encrypted, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

async function login(req) {
  const username = req.body.username;
  const password = req.body.password;
  const result = await User.findOne({
    username,
  });
  if (!result) {
    return Promise.resolve({
      status: 401,
      error: '无此账号',
    });
  }
  const decodePassword = decode(result.password);
  if (result.disable) {
    return Promise.resolve({
      status: 401,
      error: '账户已禁用',
    });
  } else if (password === decodePassword) {
    req.session.userId = result._id;
    return Promise.resolve({
      msg: 'ok',
    });
  }
  return Promise.resolve({
    status: 401,
    error: '密码错误',
  });
}

async function user(req) {
  if (req.session.userId) {
    const userdb = await User.findOne({
      _id: req.session.userId,
    });
    if (userdb.disable) {
      // res.status(401).json({
      //   status: 401,
      //   msg: '账户已禁用',
      // });
      req.session.destroy();
      return Promise.resolve({
        status: 401,
        error: '账户已禁用',
      });
    }
    return Promise.resolve({
      name: userdb.username,
    });
  }
  return Promise.resolve({
    status: 401,
    error: '未登陆或登陆失效',
  });
}

function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      res.send({
        status: 500,
        msg: err,
      });
    } else {
      res.send({
        status: 200,
        msg: 'ok',
      });
    }
  });
}

exports.login = login;
exports.logout = logout;
exports.encode = encode;
exports.decode = decode;
exports.user = user;
