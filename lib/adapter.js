'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.readOne = readOne;
exports.readMany = readMany;
exports.update = update;
exports.destroy = destroy;
exports.action = action;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _adapter = require('../configuration/adapter');

var _adapter2 = _interopRequireDefault(_adapter);

var _tremendusEs6Logger = require('tremendus-es6-logger');

var _tremendusEs6Logger2 = _interopRequireDefault(_tremendusEs6Logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = new _tremendusEs6Logger2.default({ label: 'adapter', silent: 0 });

function error(err) {
  logger.error('handledError', err);
}

function create(model, data) {
  var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var route = opts.url || ['api', model].join('/');
  var send = Object.assign({}, opts, { data: { model: data } });
  logger.log('create()', send);
  return action(route, 'post', send);
}

function readOne(model, id) {
  var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var route = opts.url || ['api', model, id].join('/');
  var send = opts;
  logger.log('read()', send);
  return action(route, 'get', send);
}

function readMany(model, query) {
  var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var route = opts.url || ['api', model, 'query'].join('/');
  var send = opts;
  logger.log('readMany()', send);
  return action(route, 'post', send);
}

function update(model, data) {
  var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var route = opts.url || ['api', model, data.id].join('/');
  var send = Object.assign({}, opts, { data: { model: data } });
  logger.log('update()', send);
  return action(route, 'patch', send);
}

function destroy(model, id) {
  var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var route = opts.url || ['api', model, id].join('/');
  logger.log('destroy()', id);
  return action(route, 'delete');
}

function action(route) {
  var method = arguments.length <= 1 || arguments[1] === undefined ? 'get' : arguments[1];
  var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  logger.log('action()', route, method, opts);
  var url = [_adapter2.default.host, route].join('/');
  return new Promise(function (resolve, reject) {
    _superagent2.default[method](url).query(opts.query).send(opts.data).end(function (err, res) {
      err ? reject(err) : resolve(res.body);
    });
  }).catch(error);
}