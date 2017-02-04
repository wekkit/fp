import { observable } from 'mobx'
import { Shop } from '../models/Shop.js'

export class ShopStore {
  _key
  error
  @observable shop

  constructor (key, error) {
    this._key = key
    this.error = error

    this.new()
  }

  new (json = {}) {
    this.shop = new Shop(this, json)
    return this.shop
  }

}
