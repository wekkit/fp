import { observable } from 'mobx'
import { Purchase } from '../models/Purchase.js'

export class PurchaseStore {
  _key
  error
  @observable user
  @observable purchase

  constructor (key, user, error) {
    this._key = key
    this.user = user
    this.error = error
  }

  new (json = {}) {
    this.purchase = new Purchase(this, json)
    return this.purchase
  }

}
