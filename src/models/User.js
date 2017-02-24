import {observable} from 'mobx'

export class User {
  _store
  @observable id = 'a9a76013-6c0f-4881-96ff-06c4ba6c1160'
  @observable token = 'abcdef'
  @observable firstName = 'Thomas'
  @observable lastName = 'Gorissen'
  @observable email = 'thomas.gorissen@me.com'
  @observable phone = '+6592309679'
  @observable locale = {
    code: 'en-SG',
    language: 'en',
    culture: 'SG'
  }
  @observable stripeId
  @observable paymentMethods = [
    {
      id: 1,
      type: 'applepay',
      last4: '',
      default: true
    },
    {
      id: 2,
      type: 'americanexpress',
      last4: '0039'
    },
    {
      id: 4,
      type: 'dinersclub',
      last4: '0012'
    },
    {
      id: 5,
      type: 'visa',
      last4: '0129'
    },
    {
      id: 6,
      type: 'mastercard',
      last4: '1243'
    },
    {
      id: 7,
      type: 'discover',
      last4: '2934'
    },
    {
      id: 8,
      type: 'paypal',
      last4: ''
    }
  ]
  @observable locationTracking = []

  constructor (store, json) {
    this._store = store
    this.set(json)
  }

  load (callback) {
    this._store.loadUser(callback)
  }

  set (json = {}) {
    Object.assign(this, json)
  }

  save (callback) {
    this._store.saveUser(this, callback)
  }

  logout (callback) {
    this._store.logout(this, callback)
  }

  register (callback) {
    this._store.register(this, callback)
  }

  get defaultPaymentMethod () {
    return this.paymentMethods.find((pm) => pm.default === true)
  }

  setDefaultPaymentMethod (id) {
    this.paymentMethods.forEach((pm) => { pm.default = pm.id === id })
  }

  deletePaymentMethod (id) {
    this.paymentMethods = this.paymentMethods.filter((pm) => pm.id !== id)
  }
}
