import shopStyles from './Shop.css'

import React from 'react'
import { observer } from 'mobx-react'
import SceneComponent from '../../mixins/SceneComponent.js'

import OptionList from '../shared/Option/OptionList.js'
import Option from '../shared/Option/Option.js'

import SpecificsModal from '../ModalBoxes/SpecificsModal.js'

import Utils from 'utils'
import FormatPrice from 'format-price'

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

  componentDidUpdate (props, state) {
    this.refs.shop && (this.refs.shop.ontouchmove = function (event) { event.stopPropagation() })
    this.refs.specifics && (this.refs.specifics.ontouchmove = function (event) { event.stopPropagation() })
  }

  locateHandler () {
    this.props.onLocate(() => {
      if (this.props.currentPosition) {
        this.props.purchase.shop.requestDuration(this.props.currentPosition)
      }
    })
  }

  onSelectItemHandler (item) {
    this.props.onBlock(SpecificsModal, {
      item: item,
      size: 'cover',
      locale: this.props.purchase.locale,
      currency: this.props.purchase.currency,
      onAddItem: this.onAddItemHandler
    })
  }

  onAddItemHandler (item) {
    // TODO
  }

  onModifyItemHandler (modifier, option) {
    // TODO
  }

  onAddonItemHandler (addon) {
    this.setState({
      addons: addon
    })
  }

  onDeleteItemHandler (item) {
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
            {category.items.map((item) =>
              <Option key={item.id}
                deletable={item.qty > 0}
                onClick={this.onSelectItemHandler.bind(this, item)}
                onDelete={this.onDeleteItemHandler.bind(this, item)}>
                <div className={shopStyles.itemqty}>{item.qty ? item.qty + 'x' : ''}</div>
                <div className={shopStyles.iteminfo}>
                  <div className={shopStyles.itemname}>{item.name}</div>
                  {!!item.description && <div className={shopStyles.itemdesc}>{item.description}</div>}
                </div>
                <div className={shopStyles.itemprice}>{
                  FormatPrice.format(this.props.purchase.locale.code, this.props.purchase.currency, (item.price / 100))
                }</div>
              </Option>
            )}
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
