import request from 'superagent'
// import config from '../configuration/adapter'
import LogService from 'log-service'

const config = {
  host: 'http://localhost:3333'
}
const logger = new LogService({ label: 'adapter', silent: 0 })

function handleError (err, route, method, opts) {
  const message = errorMessage(err, method)
  logger.error('handleError()', err, message)
}

function errorMessage(err, method) {
  let message = ''
  switch (method) {
    case 'get':
      message = 'Failed to fetch data from the server'
    case 'patch':
      message = 'Failed to update record on the server'
    case 'put':
      message = 'Failed to update record on the server'
    case 'delete':
      message = 'Failed to delete record from the server'
    default:
      message = 'Failed to communicate with the server or there was an error on the server'
  }
  logger.log('errorMessage()', method, message)
  return message
}

export function create (model, data, opts = {}) {
  const route = opts.url || ['api', model].join('/')
  const send = Object.assign({}, opts, { data: { model: data } })
  logger.log('create()', send)
  return action(route, 'post', send)
}

export function readOne (model, id, opts = {}) {
  const route = opts.url || ['api', model, id].join('/')
  const send = { query: opts }
  logger.log('read()', send)
  return action(route, 'get', send)
}

export function readMany (model, query, opts = {}) {
  const route = opts.url || ['api', model, 'query'].join('/')
  const send = Object.assign({}, opts, { data: query })
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
      .end((err, res) => { 
        if (err) {
          handleError(err, route, method, opts)
          reject({})
          return
        } 
        resolve(res.body)
      })
  }).catch(handleError)
}
