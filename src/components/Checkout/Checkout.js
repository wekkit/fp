import shopStyles from '../Shop/Shop.css'

import React from 'react'
import SceneComponent from '../../mixins/SceneComponent.js'
import {observer} from 'mobx-react'

import OptionList from '../shared/Option/OptionList.js'
import Option from '../shared/Option/Option.js'

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

  backHandler () {
    if (this.state.currentScene === 'overview') {
      this.props.onClose()
    } else {
      this.navigateHandler('overview')
    }
  }

  render () {
    // const orders = this.props.orderStore.orders

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
            {this.props.purchase.items.map((item) =>
              <Option key={item.description}
                deletable
                /* onClick={this.onSelectItemHandler.bind(this, item)} */
                onDelete={() => this.props.purchase.deleteItem(item.description)}>
                <div className={shopStyles.itemqty}>{item.quantity + 'x'}</div>
                <div className={shopStyles.iteminfo}>
                  <div className={shopStyles.itemname}>{item.shortDescription}</div>
                  {item.addons.length > 0 && <div className={shopStyles.itemdesc}>{item.addonsDescription}</div>}
                  {item.specialRequest && <div className={shopStyles.itemdesc}>{item.specialRequest}</div>}
                </div>
                <div className={shopStyles.itemprice}>{
                  FormatPrice.format(this.props.purchase.locale.code, this.props.purchase.currency, (item.price / 100))
                }</div>
              </Option>
            )}
          </OptionList>
        </ModalSlider>
      </ModalOverlay>
    )
  }

}
