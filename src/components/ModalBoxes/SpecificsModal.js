import styles from './../shared/styles/ModalStyles.css'
import shopStyles from '../Shop/Shop.css'

import ModalOverlay from '../shared/ModalOverlay/ModalOverlay.js'
import OptionList from '../shared/Option/OptionList.js'
import Option from '../shared/Option/Option.js'

import FormatPrice from 'format-price'
import { PurchaseItem } from '../../models/Purchase.js'

import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'

@observer
export default class SpecificsModal extends Component {

  constructor (props) {
    super(props)

    this.cartItem = new PurchaseItem(props.obj.item)
  }

  addItemHandler () {
    this.props.obj.onAddItem(this.cartItem)
    this.props.onClose()
  }

  render () {
    const item = this.props.obj.item

    return (
      <ModalOverlay
        changes={this.cartItem.changes}
        title={item.name}
        onBack={this.props.onClose}>
        <div className={shopStyles.specifics}>
          <div className={shopStyles.item}>
            <p>{item.description}</p>
          </div>
          <div className={shopStyles.menu}>
            {item.modifiers.map((modifier) =>
              <OptionList key={modifier.name} name={modifier.name}>
                {modifier.options.map((option) =>
                  <Option key={option.name}
                    checkable
                    checked={this.cartItem.optionIsChecked(modifier, option)}
                    onClick={() => this.cartItem.modify(modifier, option)}>
                    <div className={shopStyles.iteminfo}>
                      <div className={shopStyles.itemname}>{option.name}</div>
                      {!!option.description && <div className={shopStyles.itemdesc}>{option.description}</div>}
                    </div>
                    <div className={shopStyles.itemprice}>
                      {option.price > 0 && '+'}
                      {!!option.price && FormatPrice.format(this.props.obj.locale.code, this.props.obj.currency, (option.price / 100))}</div>
                  </Option>
                )}
              </OptionList>
            )}
            {item.addons.length &&
              <OptionList name={'Add-Ons'}>
                {item.addons.map((addon) =>
                  <Option key={addon.name}
                    checkable
                    checked={this.cartItem.addonIsChecked(addon)}
                    onClick={() => this.cartItem.toggleAddon(addon)}>
                    <div className={shopStyles.iteminfo}>
                      <div className={shopStyles.itemname}>{addon.name}</div>
                      {!!addon.description && <div className={shopStyles.itemdesc}>{addon.description}</div>}
                    </div>
                    <div className={shopStyles.itemprice}>
                      {addon.price > 0 && '+'}
                      {!!addon.price && FormatPrice.format(this.props.obj.locale.code, this.props.obj.currency, (addon.price / 100))}</div>
                  </Option>
                )}
              </OptionList>
            }
            <OptionList>
              <Option>
                <textarea onBlur={(e) => this.cartItem.addSpecialRequest(e.target.value)} placeholder={'Enter special requests for this ' + item.name + '...'} />
              </Option>
            </OptionList>
          </div>
        </div>
        <div className={styles.controls}>
          <button className={styles.button} onClick={this.addItemHandler.bind(this)}>{'Add 1 to cart'}</button>
        </div>
      </ModalOverlay>
    )
  }

}

SpecificsModal.propTypes = {
  obj: PropTypes.object.isRequired
}
