
var DomainMBA = 'http://mba.jd.com/'
var DomainNODE = 'http://zt.mba.jd.com/'

export default {
  isLogin: DomainNODE + 'node/secure/setCookie',
  logout: DomainNODE + 'node/secure/logout',
  getReturnTypeLine: DomainNODE + 'node/ztcoupon/getLine',
  getReturnTypePie: DomainNODE + 'node/ztcoupon/getPie',
  getReturnTypeTable: DomainNODE + 'node/ztcoupon/getTable',
  getReturnTypeDownload: DomainNODE + 'node/ztcoupon/download'
}
