import $ from 'jquery'

// 定义时间变量
var today = new Date()
var yesterday = getDate(new Date(today - 86400000))

function getLast7Days () {
  var last7Days = yesterday.split('-')
  last7Days = new Date(last7Days[0], last7Days[1] - 1, last7Days[2])
  last7Days.setDate(last7Days.getDate() - 6)
  last7Days = getDate(last7Days)
  return last7Days
}
function getLast30Days () {
  var last30Days = yesterday.split('-')
  last30Days = new Date(last30Days[0], last30Days[1] - 1, last30Days[2])
  last30Days.setDate(last30Days.getDate() - 29)
  last30Days = getDate(last30Days)
  return last30Days
}

function getDate (now) {
  now = now || new Date()
  var year = now.getFullYear()       // 年
  var month = now.getMonth() + 1     // 月
  var day = now.getDate()            // 日

  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }

  return [year, month, day].join('-')
}

function fillWithTPL (bedId, o, tplId, TPL, isReturn) {
  if (!o) return
  if (!tplId && tplId !== false) tplId = bedId + '_tpl'
  TPL = (tplId === false)
      ? (TPL || '')
      : $('#' + tplId).html().replace(/^\s*<!--/, '').replace(/-->\s*$/, '')

  var BLOCKS = {}
  TPL = TPL.replace(/<@([0-9a-zA-Z_-]+)@>((.|\s)*?)<@_\1@>/g, function (a0, a1, a2) {
    BLOCKS[a1] = a2
    return '[#' + a1 + '#]'
  })
  $.each(BLOCKS, function (key, tpl) {
    var ot = []
    var p = o[key]
    if (p) {
      $.each(p, function (pp, tt) {
        ot.push(fillWithTPL(false, tt, false, tpl.replace(/<_index_>/g, pp - 0 + 1)))
        // ot.push(tpl.replace(/<_index_>/g, pp-0+1).replace(/\{([0-9a-zA-Z_-]+)\}/g, function(a0, a1) {
        // return tt[a1]!==undefined ? tt[a1] : '';
        // }));
      })
    }
    BLOCKS[key] = ot.join('')
  })

  var htm = TPL.replace(
    /\{([0-9a-zA-Z_-]+)\}/g,
    function (a0, a1) {
      return o[a1] !== undefined ? o[a1] : ''
    }).replace(
    /\[#([0-9a-zA-Z_-]+)#\]/g,
    function (a0, a1) {
      return BLOCKS[a1] !== undefined ? BLOCKS[a1] : a1
    }).replace(/^\s+/, '')

  if (isReturn || bedId === false) {
    return htm
  } else {
    $('#' + bedId).html(htm)
  }
}

function formatRate (row, index, value) {
  if (value == undefined) {
    return '--'
  }
  return formatNumber(value, 2) + '%'
}
function formatDecimal (row, index, value) {
  if (value == undefined) {
    return '--'
  }
  return formatNumber(value, 2)
}
function formatInt (row, index, value) {
  if (value == undefined) {
    return '--'
  }
  var data = formatNumber(value, 0)
  return data ? data.replace(/\.\d\d/, '') : ''
}
function formatNumber (num, precision) {
  if (!isNaN(num)) {
    var s = parseFloat(num).toFixed(precision)
    var sign = s < 0 ? '-' : ''

    s = Math.abs(s)
    s = s.toString().replace(/^(\d*)$/, '$1.')
    s = (s + '00').replace(/(\d*\.\d\d)\d*/, '$1')
    s = s.replace('.', ',')

    var re = /(\d)(\d{3},)/
    while (re.test(s)) {
      s = s.replace(re, '$1,$2')
    }

    s = s.replace(/,(\d\d)$/, '.$1')

    return sign + s
  }
  return num
}

function getCookie (name) {
  let reg = new RegExp('(^| )' + name + '(?:=([^;]*))?(;|$)')
  let val = document.cookie.match(reg)
  return val ? (val[2] ? unescape(val[2]) : '') : null
}
function deleteCookie (name, path, domain) {
  if (getCookie(name)) {
    document.cookie = name + '=' +
      ((path) ? ';path=' + path : '') +
      ((domain) ? ';domain=' + domain : '') +
      ';expires=Thu, 01-Jan-1970 00:00:01 GMT'
  }
}
function setCookie (name, value, expires, path, domain, secure) {
  var today = new Date()
  today.setTime(today.getTime())
  if (expires) {
    expires = expires * 1000 * 60 * 60 * 24
  }
  var expires_date = new Date(today.getTime() + (expires))
  document.cookie = name + '=' + escape(value) +
    ((expires) ? ';expires=' + expires_date.toGMTString() : '') + // expires.toGMTString()
    ((path) ? ';path=' + path : '') +
    ((domain) ? ';domain=' + domain : '') +
    ((secure) ? ';secure' : '')
}

export default {
  yesterday: yesterday,
  getLast7Days: getLast7Days,
  getLast30Days: getLast30Days,

  fillWithTPL: fillWithTPL,

  formatRate: formatRate,
  formatDecimal: formatDecimal,
  formatInt: formatInt,
  formatNumber: formatNumber,

  getCookie: getCookie,
  deleteCookie: deleteCookie,
  setCookie: setCookie
}
