import fetch from '@/utils/fetch'
import Service from './services'

export function getReturnTypeLine (query) {
  return fetch({
    url: Service.getReturnTypeLine,
    method: 'get',
    params: query
  })
}

export function getReturnTypePie (query) {
  return fetch({
    url: Service.getReturnTypePie,
    method: 'get',
    params: query
  })
}

export function getReturnTypeTable (query) {
  return fetch({
    url: Service.getReturnTypeTable,
    method: 'get',
    params: query
  })
}
