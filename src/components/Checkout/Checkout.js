import shopStyles from '../Shop/Shop.css'

import React, { Component, PropTypes } from 'react'
import {observer} from 'mobx-react'

import OptionList from '../shared/Option/OptionList.js'
import Option from '../shared/Option/Option.js'
import Method from '../Payment/Method.js'

import ModalOverlay from '../shared/ModalOverlay/ModalOverlay.js'

import FormatPrice from 'format-price'

@observer
export default class CheckoutView extends Component {

  componentWillUpdate () {
    if (this.props.purchase.items.length < 1) {
      setTimeout(() => this.props.onClose(), 1)
    }
  }

  render () {
    const purchase = this.props.purchase

    return <ModalOverlay
      title={'Cart'}
      backVisible={false}
      onBack={() => this.props.onClose()}>
      <OptionList>
        {purchase.items.map((item) =>
          <Option key={item.description}
            deletable
            /* onClick={this.onSelectItemHandler.bind(this, item)} */
            onDelete={() => purchase.deleteItem(item.description)}>
            <div className={shopStyles.itemqty}>{item.quantity + 'x'}</div>
            <div className={shopStyles.iteminfo}>
              <div className={shopStyles.itemname}>{item.shortDescription}</div>
              {item.addons.length > 0 && <div className={shopStyles.itemdesc}>{item.addonsDescription}</div>}
              {item.specialRequest && <div className={shopStyles.itemdesc}>{item.specialRequest}</div>}
            </div>
            <div className={shopStyles.itemprice}>{
              FormatPrice.format(purchase.locale.code, purchase.currency, (item.price / 100))
            }</div>
          </Option>
        )}
        <Option className={shopStyles.total}>
          <div className={shopStyles.rowdesc}>Total</div>
          <div className={shopStyles.total}>{
            FormatPrice.format(purchase.locale.code, purchase.currency, (purchase.total / 100))
          }</div>
        </Option>
      </OptionList>
      <OptionList>
        <Option>
          <textarea onBlur={(e) => purchase.addSpecialRequest(e.target.value)} placeholder={'Enter special instructions for this order...'} />
        </Option>
      </OptionList>
      <OptionList>
        <Method {...purchase.user.defaultPaymentMethod} />
      </OptionList>
      <br /><br /><br /><br />
    </ModalOverlay>
  }

}

CheckoutView.propTypes = {
  onClose: PropTypes.func.isRequired,
  purchase: PropTypes.object.isRequired
}
