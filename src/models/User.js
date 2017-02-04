import {observable} from 'mobx'

export class User {
  _store
  @observable id = 'a9a76013-6c0f-4881-96ff-06c4ba6c1160'
  @observable token = 'abcdef'
  @observable first_name = 'Thomas'
  @observable last_name = 'Gorissen'
  @observable email = 'thomas.gorissen@me.com'
  @observable phone = '+6592309679'
  @observable locale = {
    code: 'en-SG',
    language: 'en',
    culture: 'SG'
  }
  @observable stripe_customer_id
  @observable payment_methods = []
  @observable locationTracking = []
  @observable last_updated

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
}
