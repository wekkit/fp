import {observable, computed} from 'mobx'

import Utils from 'utils'

export const PurchaseStatus = {

}

export class Purchase {
  _store
  @observable id
  @observable status = 0
  date
  items = []
  @observable quantity = 0
  total = 0
  @observable paymentMethod
  specialRequest
  shop
  user

  @computed get statusString () {
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

  itemQuantity (itemId) {
    return this.items.filter((i) => i.item.id === itemId).map((i) => i.quantity).reduce((a, b) => (a | 0) + b, 0)
  }

  calculateCart () {
    this.quantity = this.items.map((i) => i.quantity).reduce((a, b) => (a | 0) + b, 0)
    this.total = this.items.reduce((a, b) => {
      return { price: (a ? a.price : 0) + b.price * b.quantity }
    }, 0).price || 0
    // console.log(this.toString())
  }

  addItem (item) {
    if (!item) {
      return
    }
    let i = this.items.findIndex((i) => i.description === item.description)
    if (i >= 0) {
      this.items[i].quantity += item.quantity
    } else {
      this.items.push(item)
    }
    this.calculateCart()
  }

  deleteItem (itemDescription) {
    this.items = this.items.filter((i) => i.description !== itemDescription)
    this.calculateCart()
  }

  deleteItems (itemId) {
    this.items = this.items.filter((i) => i.item.id !== itemId)
    this.calculateCart()
  }

  addSpecialRequest (value) {
    this.specialRequest = value
  }

  toString () {
    return this.items.map((i) => i.quantity + 'x ' + i.description + ' $' + (i.price / 100)).join('\n') + '\nTotal: $' + (this.total / 100)
  }

  purchase () {
    // purchase
  }
}

export class PurchaseItem {
  item
  quantity = 1
  price = 0
  modifiers = {}
  addons = []
  specialRequest
  @observable changes = 0

  get modifiersDescription () {
    return Object.keys(this.modifiers).map((k) => this.modifiers[k].name).sort(Utils.sortByName).join(', ')
  }

  get addonsDescription () {
    return this.addons.sort(Utils.sortByName).map((a) => a.name).join(', ')
  }

  get shortDescription () {
    return (this.modifiersDescription + ' ' + this.item.name).trim()
  }

  @computed get description () {
    const specialRequest = this.specialRequest ? ' (' + this.specialRequest + ')' : ''
    const addons = (this.addons.length > 0 ? ' - ' : '') + this.addonsDescription
    return (this.shortDescription + addons + specialRequest).trim()
  }

  constructor (item) {
    if (!item) {
      return
    }
    this.item = item
    this.price += item.price | 0
    item.modifiers && item.modifiers.forEach((modifier) => {
      let option = modifier.options.find((option) => option.default)
      this.modify(modifier, option)
    })
    item.addons && item.addons.forEach((addon) => {
      if (addon.default) {
        this.toggleAddon(addon)
      }
    })
  }

  optionIsChecked (modifier, option) {
    return this.modifiers[modifier.name] && this.modifiers[modifier.name].name === option.name
  }

  addonIsChecked (addon) {
    return this.addons.findIndex((a) => a.name === addon.name) >= 0
  }

  changeQuantity (quantity) {
    this.quantity += quantity | 0
    if (this.quantity | 0 < 1) {
      this.quantity = 0
    }
    this.changes++
  }

  addSpecialRequest (value) {
    this.specialRequest = value
    this.changes++
  }

  modify (modifier, option) {
    if (!modifier || !option) {
      return
    }
    if (this.modifiers[modifier.name]) {
      this.price -= this.modifiers[modifier.name].price | 0
    }
    this.modifiers[modifier.name] = option
    this.price += option.price | 0
    this.changes++
  }

  toggleAddon (addon) {
    if (!addon) {
      return
    }
    let i = this.addons.findIndex((a) => a.name === addon.name)
    if (i >= 0) {
      this.price -= this.addons[i].price | 0
      this.addons.splice(i, 1)
    } else {
      this.addons.push(addon)
      this.price += addon.price | 0
    }
    this.changes++
  }
}
