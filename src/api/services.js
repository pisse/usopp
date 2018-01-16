
var DomainMBA = 'http://hotel.baidu.com/'
var DomainNODE = 'http://zt.hotel.baidu.com/'

export default {
  isLogin: DomainNODE + 'node/secure/setCookie',
  logout: DomainNODE + 'node/secure/logout',
  getReturnTypeLine: DomainNODE + 'node/ztcoupon/getLine',
  getReturnTypePie: DomainNODE + 'node/ztcoupon/getPie',
  getReturnTypeTable: DomainNODE + 'node/ztcoupon/getTable',
  getReturnTypeDownload: DomainNODE + 'node/ztcoupon/download'
}
