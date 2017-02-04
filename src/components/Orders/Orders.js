import styles from '../shared/styles/ModalStyles.css'

import React from 'react'
import SceneComponent from '../../mixins/SceneComponent.js'
import {observer} from 'mobx-react'

import OptionList from '../shared/Option/OptionList.js'
import Option from '../shared/Option/Option.js'

import ModalSlider from '../shared/ModalSlider/ModalSlider.js'
import ModalOverlay from '../shared/ModalOverlay/ModalOverlay.js'

@observer
export default class OrdersView extends SceneComponent {

  constructor (props) {
    super(props)

    this.state = {
      currentScene: 'overview',
      nextScene: '',
      edited: false,
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
        title={'Orders'}
        backVisible={false}
        onBack={this.backHandler.bind(this)}>
        <ModalSlider
          from='left'
          cover={!false}
          render={this.toRender('overview')}
          visible={this.toShow('overview')}>
          <OptionList name={'Last week'}>
            <Option>
              No orders yet
            </Option>
          </OptionList>
        </ModalSlider>
      </ModalOverlay>
    )
  }

}
