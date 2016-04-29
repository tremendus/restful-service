/* eslint-disable no-unused-vars */
import * as adapter from './adapter'

function serialize () {
  // handled by SuperAgent
}

function deserialize (data) {
  // handled by SuperAgent
}

export function create (model, data, opts) {
  return adapter.create(model, data, opts)
}

export function readMany (model, query, opts) {
  return adapter.readMany(model, query, opts)
}

export function readOne (model, id, opts) {
  return adapter.readOne(model, id, opts)
}

export function update (model, data, opts) {
  return adapter.update(model, data, opts)
}

export function destroy (model, id, opts) {
  return adapter.destroy(model, id, opts)
}

export function action (route, method, opts) {
  return adapter.action(route, method, opts)
}
