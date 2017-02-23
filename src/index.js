// Polyfills
import 'whatwg-fetch'

import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App.js'
import Utils from 'utils'

import {ErrorStore} from './stores/Error.js'
import {UserStore} from './stores/User.js'
import {ShopStore} from './stores/Shop.js'
import {PurchaseStore} from './stores/Purchase.js'

import Icon from './components/shared/images/magicbus_icon.png'

var fonts = document.createElement('link')
fonts.rel = 'stylesheet'
fonts.type = 'text/css'
fonts.href = 'https://fonts.googleapis.com/css?family=Fredoka+One'

document.head.appendChild(fonts)

// Set title and page info
var title = document.createElement('title')
title.textContent = 'forpickup.co'
var favIcon = document.createElement('link')
favIcon.rel = 'icon'
favIcon.href = Icon

document.head.appendChild(title)
document.head.appendChild(favIcon)

// Mobile viewport configuration
var viewport = document.createElement('meta')
viewport.name = 'viewport'
viewport.content = 'width=device-width, initial-scale=1, user-scalable=no'

document.head.appendChild(viewport)

// Apple mobile app
var homescreenIcon = document.createElement('link')
homescreenIcon.rel = 'apple-touch-icon'
homescreenIcon.href = Icon
var enableApp = document.createElement('meta')
enableApp.name = 'apple-mobile-web-app-capable'
enableApp.content = 'yes'
var statusBar = document.createElement('meta')
statusBar.name = 'apple-mobile-web-app-status-bar-style'
statusBar.content = 'white'

document.head.appendChild(homescreenIcon)
document.head.appendChild(enableApp)
document.head.appendChild(statusBar)

// Define mock trips asyncronously
var errorStore = new ErrorStore('fp-error')
var userStore = new UserStore('fp-user', errorStore.error)
var shopStore = new ShopStore('fp-shop', errorStore.error)
var purchaseStore = new PurchaseStore('fp-purchase', userStore.user, errorStore.error)

purchaseStore.new({user: userStore.user, shop: shopStore.shop})

// Start up the React app
if (Utils.browserIsCompatible()) {
  var app = document.createElement('div')
  ReactDOM.render(<App
    userStore={userStore}
    shopStore={shopStore}
    purchaseStore={purchaseStore}
    errorStore={errorStore} />, app)
  document.body.appendChild(app)
} else {
  document.getElementById('browserIncompatible').style.display = 'block'
}

// Enable :active CSS selector on mobile
document.ontouchstart = function () {}

// Detect the use of mobile Safari to consider the navigation bar on the bottom of the screen as deadspace
Utils.detectSafari(0)
window.onresize = Utils.detectSafari
