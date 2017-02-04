import shopStyles from './Shop.css'
import modalStyles from '../shared/styles/ModalStyles.css'

import React, { Component } from 'react'
import { observer } from 'mobx-react'
import OptionList from '../shared/Option/OptionList.js'
import Option from '../shared/Option/Option.js'

import Utils from 'utils'
import FormatPrice from 'format-price'

import Logo from '../shared/images/fabcafelogo.png'

@observer
export default class ShopView extends Component {

  componentDidMount () {
    // TODO: wtf. blocks delete!!
    this.refs.shop.ontouchmove = function (event) { event.stopPropagation() }
  }

  locateHandler () {
    this.props.onLocate(() => {
      if (this.props.currentPosition) {
        this.props.purchase.shop.requestDuration(this.props.currentPosition)
      }
    })
  }

  onAddHandler () {
    // TODO
  }

  onDeleteHandler () {
    // TODO
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
                ({shop.pickupTimesOnDate().map((times) => {
                  return (
                    <span key={++i}>
                      {Utils.printTime(times.startHour, times.startMinute, shop.hour12)} &minus; {Utils.printTime(times.endHour, times.endMinute, shop.hour12)}
                    </span>
                  )
                })})
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
          {shop.menu.map((category) => {
            return (
              <OptionList key={category.id} {...category}>
                {category.items.map((item) => {
                  return (
                    <Option key={item.id} {...item}
                      deletable={item.qty > 0}
                      onClick={this.onAddHandler.bind(this)}
                      onDelete={this.onDeleteHandler.bind(this, item.id)}>
                      <div className={shopStyles.itemqty}>{item.qty ? item.qty + 'x' : ''}</div>
                      <div className={shopStyles.itemname}>{item.name}</div>
                      <div className={shopStyles.itemprice}>{
                        FormatPrice.format(this.props.purchase.locale.code, this.props.purchase.currency, (item.price / 100))
                      }</div>
                    </Option>
                  )
                })}
              </OptionList>
            )
          })}
        </div>
        <div className={shopStyles.footer}>
          <span className={shopStyles.forpickup}>forpickup</span> ♥ Singapore
        </div>
      </div>
    )
  }

}
