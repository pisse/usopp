import fetch from '@/utils/fetch'
import Service from './services'

const LOGOUT_HREF = 'http://ssa.jd.com/sso/login?ReturnUrl=http://zt.mba.jd.com'
export function checkLogin (query) {
  return fetch({
    url: Service.isLogin,
    method: 'get',
    params: query
  })
}
export function setNodeCookie () {
  return fetch({
    url: Service.setNodeCookie,
    params: {
      r: Math.random()
    }
  })
}

export function logOut () {
  return fetch({
    url: Service.logout,
    method: 'get'
  }).then((res) => {
    location.href = LOGOUT_HREF
  })
}
