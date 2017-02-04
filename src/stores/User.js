import { observable, autorun } from 'mobx'
import { User } from '../models/User.js'
import Config from 'config'

export class UserStore {
  key
  error
  @observable user

  constructor (key, error) {
    this._key = key
    this.error = error
    this.new(this.readAuthFromLocalStorage())

    this.subscribeLocalStorageToAuth()

    // If we have a token saved
    if (this.id && this.token) {
      this.loadUser()
    }
  }

  new (json = {}) {
    this.user = new User(this, json)
    return this.user
  }

  readAuthFromLocalStorage () {
    try {
      const item = window.localStorage.getItem(this._key)
      return (item && JSON.parse(item)) || {}
    } catch (error) {
      return {}
    }
  }

  subscribeLocalStorageToAuth () {
    autorun(() => {
      try {
        window.localStorage.setItem(this._key, JSON.stringify(this.user))
      } catch (e) {
        return
      }
    })
  }

  updatePassword (password, token, callback) {
    // updatePassword
  }

  resetPassword (email, callback) {
    // resetPassword
  }

  register (user, callback) {
    user = user || this.user
    if (!user) {
      return
    }
    window.fetch(Config.apiEndpoint + 'register', {
      method: 'POST',
      mode: 'cors',
      headers: new window.Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify({
        user: user.toJson()
      })
    })
    .then(this.error.handleResponse())
    .then((data) => {
      this.error.clear()
      if (!data.data) {
        callback instanceof Function && callback(data.meta, user)
        return
      }
      this.user.set(data.data)
      callback instanceof Function && callback(null, this.user)
    })
    .catch((error) => {
      this.error.badConnection(error)
      callback instanceof Function && callback(error, user)
    })
  }

  login (email, password, callback = (() => {})) {
    window.fetch(Config.apiEndpoint + 'login', {
      method: 'POST',
      mode: 'cors',
      headers: new window.Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify({
        user: {
          email: email,
          password: password
        }
      })
    })
    .then(this.error.handleResponse())
    .then((user) => {
      if (!user) {
        callback('Unauthorized')
        return
      }
      this.user.set(user)
      callback(null, this.user)
    })
    .catch(callback)
  }

  logout (callback = (() => {})) {
    this.user.set({
      token: null
    })
    this.new()
    window.fetch(Config.apiEndpoint + 'logout', {
      method: 'DELETE',
      mode: 'cors'
    })
    callback(null, this.user)
  }

  loadUser (callback = (() => {})) {
    window.fetch(Config.apiEndpoint + 'users/' + this.user.id, {
      method: 'GET',
      mode: 'cors',
      headers: new window.Headers({
        'Authorization': this.user.token
      })
    })
    .then(this.error.handleResponse())
    .then((user) => {
      this.user.set(user)
      callback(null, this.user)
    })
    .catch(callback)
  }

  saveUser (object, callback = (() => {})) {
    window.fetch(Config.apiEndpoint + 'users/' + object.id, {
      method: 'PUT',
      mode: 'cors',
      headers: new window.Headers({
        'Authorization': this.user.token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify(object)
    })
    .then(this.error.handleResponse())
    .then((user) => {
      this.user.set(user)
      callback(null, this.user)
    })
    .catch(callback)
  }

}
