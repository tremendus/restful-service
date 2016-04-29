'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.readMany = readMany;
exports.readOne = readOne;
exports.update = update;
exports.destroy = destroy;
exports.action = action;

var _adapter = require('./adapter');

var adapter = _interopRequireWildcard(_adapter);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function serialize() {
  // handled by SuperAgent
} /* eslint-disable no-unused-vars */


function deserialize(data) {
  // handled by SuperAgent
}

function create(model, data, opts) {
  return adapter.create(model, data, opts);
}

function readMany(model, query, opts) {
  return adapter.readMany(model, query, opts);
}

function readOne(model, id, opts) {
  return adapter.readOne(model, id, opts);
}

function update(model, data, opts) {
  return adapter.update(model, data, opts);
}

function destroy(model, id, opts) {
  return adapter.destroy(model, id, opts);
}

function action(route, method, opts) {
  return adapter.action(route, method, opts);
}