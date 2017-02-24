import shopStyles from '../Shop/Shop.css'

import React, { PropTypes } from 'react'
import SceneComponent from '../../mixins/SceneComponent.js'
import {observer} from 'mobx-react'

import OptionList from '../shared/Option/OptionList.js'
import Option from '../shared/Option/Option.js'
import Method from '../Payment/Method.js'

import ModalSlider from '../shared/ModalSlider/ModalSlider.js'
import ModalOverlay from '../shared/ModalOverlay/ModalOverlay.js'

import FormatPrice from 'format-price'

@observer
export default class CheckoutView extends SceneComponent {

  constructor (props) {
    super(props)

    this.state = {
      currentScene: 'overview',
      nextScene: '',
      loading: false
    }
  }

  componentWillUpdate () {
    if (this.props.purchase.items.length < 1) {
      setTimeout(() => this.props.onClose(), 1)
    }
  }

  backHandler () {
    if (this.state.currentScene === 'overview') {
      this.props.onClose()
    } else {
      this.navigateHandler('overview')
    }
  }

  render () {
    const purchase = this.props.purchase

    return (
      <ModalOverlay
        title={'Cart'}
        backVisible={false}
        onBack={this.backHandler.bind(this)}>
        <ModalSlider
          from='bottom'
          cover
          render={this.toRender('overview')}
          visible={this.toShow('overview')}>
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
        </ModalSlider>
      </ModalOverlay>
    )
  }

}

Option.propTypes = {
  onClose: PropTypes.func.isRequired,
  purchase: PropTypes.object.isRequired
}
