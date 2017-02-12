import styles from './../shared/styles/ModalStyles.css'
import shopStyles from '../Shop/Shop.css'

import OptionList from '../shared/Option/OptionList.js'
import Option from '../shared/Option/Option.js'

import FormatPrice from 'format-price'

import React, { Component, PropTypes } from 'react'

export default class SpecificsModal extends Component {

  componentDidMount () {
    // TODO: wtf. blocks delete!!
    this.refs.specifics.ontouchmove = function (event) { event.stopPropagation() }
  }

  addItemHandler () {
    this.props.onClose()
    this.props.obj.onAddItem()
  }

  closeHandler () {
    this.props.onClose()
    this.props.obj.onClose()
  }

  onModifyItemHandler (modifier, option) {
    // TODO
  }

  onAddonItemHandler (addon) {
    this.setState({
      addons: addon
    })
  }

  render () {
    const item = this.props.obj.item

    return (
      <div ref='specifics' className={shopStyles.specificsmodalbox}>
        <div className={shopStyles.specifics}>
          <div className={shopStyles.item}>
            <h1>{item.name}</h1>
            <p>{item.description}</p>
          </div>
          <div className={shopStyles.menu}>
            {item.modifiers.map((modifier) =>
              <OptionList key={modifier.name} name={modifier.name}>
                {modifier.options.map((option) =>
                  <Option key={option.name}
                    checkable={!false}
                    checked={option.default}
                    onClick={this.onModifyItemHandler.bind(this, modifier, option)}>
                    <div className={shopStyles.iteminfo}>
                      <div className={shopStyles.itemname}>{option.name}</div>
                      {!!option.description && <div className={shopStyles.itemdesc}>{option.description}</div>}
                    </div>
                    <div className={shopStyles.itemprice}>{
                      !!option.price && FormatPrice.format(this.props.obj.locale.code, this.props.obj.currency, (option.price / 100))
                    }</div>
                  </Option>
                )}
              </OptionList>
            )}
            {item.addons.length &&
              <OptionList name={'Add-Ons'}>
                {item.addons.map((addon) =>
                  <Option key={addon.id}
                    checkable={!false}
                    checked={addon.checked}
                    onClick={this.onAddonItemHandler.bind(this, addon)}>
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
                <textarea placeholder={'Enter special requests for this ' + item.name + '...'} />
              </Option>
            </OptionList>
          </div>
        </div>
        <div className={styles.controls}>
          <button className={styles.button} onClick={this.addItemHandler.bind(this)}>{'Add 1 Item'}</button>
        </div>
      </div>
    )
  }

}

SpecificsModal.propTypes = {
  obj: PropTypes.object.isRequired
}
