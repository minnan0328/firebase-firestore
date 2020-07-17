import moment from 'moment'
const setCookie = ((cookieName, cookieValue, cookieData) => {
  var exp = new Date(moment().add(cookieData, 'h').toDate()).toUTCString()
  document.cookie = cookieName + "=" + escape(cookieValue) + ";expires=" + exp
})
const deleteCookie = ((cookieName, cookieValue, cookieData) => {
  var exp = new Date(moment().subtract(cookieData, 'd').toDate()).toUTCString()

  document.cookie = cookieName + "=" + escape(cookieValue) + ";expires=" + exp
})
const getCookie = ((name) => {
  var arr = document.cookie.match(new RegExp("(^| )"+ name + "=([^;]*)(;|$)"));
  return arr != null ? unescape(arr[2]) : null;
})
export default {setCookie,getCookie, deleteCookie}
