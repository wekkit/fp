import {observable, computed} from 'mobx'

export const PurchaseStatus = {

}

export class Purchase {
  _store
  @observable id
  @observable status = 0
  @observable date
  @observable items = []
  @observable payment_method
  shop
  user

  @computed get status_string () {
    for (var property in PurchaseStatus) {
      if (PurchaseStatus[property] === this.status) {
        return property.toLowerCase()
      }
    }
  }

  get currency () {
    return this.shop.currency
  }

  get locale () {
    return this.user.locale
  }

  constructor (store, json) {
    this._store = store
    this.set(json)
  }

  set (json = {}) {
    Object.assign(this, json)
  }

  purchase () {
    // purchase
  }
}
