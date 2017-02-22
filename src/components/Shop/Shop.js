import shopStyles from './Shop.css'

import React from 'react'
import { observer } from 'mobx-react'
import SceneComponent from '../../mixins/SceneComponent.js'

import OptionList from '../shared/Option/OptionList.js'
import Option from '../shared/Option/Option.js'

import InfoModal from '../ModalBoxes/InfoModal.js'
import SpecificsModal from '../ModalBoxes/SpecificsModal.js'

import Utils from 'utils'
import FormatPrice from 'format-price'
import { PurchaseItem } from '../../models/Purchase.js'

import Logo from '../shared/images/fabcafelogo.png'

@observer
export default class ShopView extends SceneComponent {

  constructor (props) {
    super(props)

    this.state = {
      currentScene: 'overview',
      nextScene: '',
      loading: false
    }
  }

  componentDidMount () {
    // TODO: wtf. blocks delete!!
    this.refs.shop.ontouchmove = function (event) { event.stopPropagation() }
  }

  /* componentDidUpdate (props, state) {
    this.refs.shop && (this.refs.shop.ontouchmove = function (event) { event.stopPropagation() })
  } */

  locateHandler () {
    this.props.onLocate(() => {
      if (this.props.currentPosition) {
        this.props.purchase.shop.requestDuration(this.props.currentPosition)
      }
    })
  }

  onSelectItemHandler (item) {
    /* if (!this.props.purchase.shop.isOpen()) {
      this.props.onBlock(InfoModal, {
        title: 'Snap...',
        text: this.props.purchase.shop.name + ' is currently closed and can\'t take your order.'
      })
      return
    } */

    if (item.modifiers.length || item.addons.length) {
      this.props.onBlock(SpecificsModal, {
        item: item,
        size: 'cover',
        locale: this.props.purchase.locale,
        currency: this.props.purchase.currency,
        onAddItem: this.onAddItemHandler.bind(this)
      })
    } else {
      this.onAddItemHandler(new PurchaseItem(item))
    }
  }

  onAddItemHandler (item) {
    this.props.purchase.addItem(item)
  }

  onDeleteItemHandler (itemId) {
    this.props.purchase.deleteItem(itemId)
  }

  render () {
    const shop = this.props.purchase.shop
    let i = 0

    return (
      <div ref='shop' className={shopStyles.shop}>
        <div className={shopStyles.header}>
          <h1 className={shopStyles.logo}><a href={'#'}><img src={Logo} alt={shop.name} /></a></h1>
          <div className={shopStyles.pickupinfo}>
            <span className={shopStyles.walkingmin} onClick={this.locateHandler.bind(this)}>{this.props.currentPosition ? (shop.duration ? shop.duration + ' walk' : 'Locating...') : 'How far is it?'}</span>
            <span className={shopStyles.pickupstatus} onClick={''}>
              {shop.isOpen() ? 'open' : 'closed'}
              <span className={shopStyles.pickuptimes}>
                {shop.pickupTimesOnDate().map((times) =>
                  <span key={++i}>
                    {Utils.printTime(times.startHour, times.startMinute, shop.hour12)} &minus; {Utils.printTime(times.endHour, times.endMinute, shop.hour12)}
                  </span>
                )}
              </span>
            </span>
          </div>
        </div>
        <div className={shopStyles.intro}>
          <address className={shopStyles.address}>
            {shop.address}
          </address>
          <p>{shop.intro}</p>
        </div>
        <div className={shopStyles.menu}>
          {shop.menu.map((category) => <OptionList key={category.id} name={category.name}>
            {category.items.map((item) => {
              const qty = this.props.purchase.itemQuantity(item.id)
              return <Option key={item.id}
                deletable={qty > 0}
                onClick={this.onSelectItemHandler.bind(this, item)}
                onDelete={this.onDeleteItemHandler.bind(this, item.id)}>
                <div className={shopStyles.itemqty}>{qty > 0 ? qty + 'x' : ''}</div>
                <div className={shopStyles.iteminfo}>
                  <div className={shopStyles.itemname}>{item.name}</div>
                  {!!item.description && <div className={shopStyles.itemdesc}>{item.description}</div>}
                </div>
                <div className={shopStyles.itemprice}>{
                  FormatPrice.format(this.props.purchase.locale.code, this.props.purchase.currency, (item.price / 100))
                }</div>
              </Option>
            })}
          </OptionList>
          )}
        </div>
        <div className={shopStyles.footer}>
          <span className={shopStyles.forpickup}>forpickup</span> ♥ Singapore
        </div>
      </div>
    )
  }

}
