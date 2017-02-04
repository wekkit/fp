import Config from 'config'
import DateFormat from 'dateformat'

module.exports = {
  getClassName: function (base, ...props) {
    return props.map((prop) => {
      if (prop && base[prop]) {
        return base[prop]
      }
    }).join(' ')
  },
  getSemanticDay: function (date, dateformat) {
    if (!new Date(date)) {
      return new Date()
    } else if (new Date().getDate() - 1 === new Date(date).getDate()) {
      return 'yesterday'
    } else if (new Date().getDate() + 1 === new Date(date).getDate()) {
      return 'tomorrow'
    } else if (new Date().getDate() === new Date(date).getDate()) {
      return 'today'
    } else {
      return 'on ' + DateFormat(new Date(date), dateformat)
    }
  },
  formatPhoneNumber: function (phone) { // TODO phonnumber
    return phone ? phone.replace(/[^0-9+]/g, '').replace(/^00/, '+').replace(/^(\+1)?((?:\d{3})(?=\d))(\d{1,3})?(\d{1,4})?.*$/u, '$1 ($2) $3 $4').trim() : ''
  },
  detectSafari: function (orientation = 90) {
    var ua = navigator.userAgent
    if (navigator.standalone) {
      document.body.classList.add('homeScreenSafari')
    } else if (ua.indexOf('iPhone') !== -1 && ua.indexOf('Safari') !== -1 && ua.indexOf('CriOS') === -1 && ua.indexOf('FxiOS') === -1 && Math.abs(window.orientation) === orientation) {
      document.body.classList.add('dealWithMobileSafari')
    } else {
      document.body.classList.remove('dealWithMobileSafari')
    }
  },
  goTo (location, params) {
    return function () { window.location.assign(location + (Config.environment === 'local' ? '' : '.html')) }
  },
  browserIsCompatible () {
    return !!window.requestAnimationFrame
  },
  captureTag (json) {
    if (window.dataLayer) {
      window.dataLayer.push(json)
    }
  },
  printTime (hour, minute, hour12) {
    let str = minute ? ':MM' : ''
    return DateFormat((new Date((new Date()).setHours(hour, minute))), hour12 ? 'h' + str + 'tt' : 'H' + str)
  }
}
