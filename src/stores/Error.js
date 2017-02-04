import {observable} from 'mobx'

export class ErrorStore {
  _key
  @observable error

  constructor (key) {
    this._key = key
    this.error = new Error(this)
  }
}

export class Error {
  _store
  @observable message = ''
  @observable obj = null

  constructor (store) {
    this._store = store
  }

  handleResponse (data) {
    if (!data) {
      this.badConnection()
    } else {
      this.clear()
    }
  }

  badConnection () {
    this.message = 'We\'re having trouble connecting...'
  }

  clear () {
    this.message = ''
  }
}
