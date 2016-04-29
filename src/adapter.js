import request from 'superagent'
import config from '../configuration/adapter'
import LogService from 'tremendus-es6-logger'

const logger = new LogService({ label: 'adapter', silent: 0 })

function error (err) {
  logger.error('handledError', err)
}

export function create (model, data, opts = {}) {
  const route = opts.url || ['api', model].join('/')
  const send = Object.assign({}, opts, { data: { model: data } })
  logger.log('create()', send)
  return action(route, 'post', send)
}

export function readOne (model, id, opts = {}) {
  const route = opts.url || ['api', model, id].join('/')
  const send = opts
  logger.log('read()', send)
  return action(route, 'get', send)
}

export function readMany (model, query, opts = {}) {
  const route = opts.url || ['api', model, 'query'].join('/')
  const send = opts
  logger.log('readMany()', send)
  return action(route, 'post', send)
}

export function update (model, data, opts = {}) {
  const route = opts.url || ['api', model, data.id].join('/')
  const send = Object.assign({}, opts, { data: { model: data } })
  logger.log('update()', send)
  return action(route, 'patch', send)
}

export function destroy (model, id, opts = {}) {
  const route = opts.url || ['api', model, id].join('/')
  logger.log('destroy()', id)
  return action(route, 'delete')
}

export function action (route, method = 'get', opts = {}) {
  logger.log('action()', route, method, opts)
  const url = [config.host, route].join('/')
  return new Promise((resolve, reject) => {
    request[method](url)
      .query(opts.query)
      .send(opts.data)
      .end((err, res) => { err ? reject(err) : resolve(res.body) })
  }).catch(error)
}
