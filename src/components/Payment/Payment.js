import payment from './Payment.css'

import Config from 'config'

import React from 'react'
import {observer} from 'mobx-react'
import SceneComponent from '../../mixins/SceneComponent.js'

import OptionList from '../shared/Option/OptionList.js'
import OptionRow from '../shared/Option/OptionRow.js'
import Option from '../shared/Option/Option.js'

import ModalSlider from '../shared/ModalSlider/ModalSlider.js'
import ModalOverlay from '../shared/ModalOverlay/ModalOverlay.js'
import ConfirmModal from '../ModalBoxes/ConfirmModal.js'
import InfoModal from '../ModalBoxes/InfoModal.js'

import Method from './Method.js'

@observer
export default class PaymentView extends SceneComponent {

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

  actionHandler () {
    if (this.state.currentScene === 'addpayment') {
      if (!window.Stripe) {
        this.props.onBlock(InfoModal, {
          title: 'Payment',
          text: 'We\'re sorry. We seem to have problems reaching our payment provider currently.'
        })
        return
      }
      this.setState({loading: true})
      var expiry = this.refs.expiry.value.split('/')
      window.Stripe.card.createToken({
        number: this.refs.ccnumber.value.replace(/ /, ''),
        cvc: this.refs.cvv.value,
        exp_month: expiry[0],
        exp_year: expiry[1]
      }, (status, response) => {
        this.setState({loading: false})
        if (response.error) {
          this.props.onBlock(InfoModal, {
            title: 'Payment',
            text: response.error.message
          })
          return
        }
        var params = {
          last4: response.card.last4,
          type: response.card.type,
          stripeId: response.id
        }
        this.props.user.set(params)
        this.props.user.savePayment(params)
        this.backHandler()
      })
    }
  }

  addMethodHandler () {
    this.navigateHandler('addpayment')

    if (!window.Stripe) {
      var elem = document.createElement('script')
      elem.src = 'https://js.stripe.com/v2/'
      elem.onload = function () {
        window.Stripe.setPublishableKey(Config.stripeKey)
      }
      document.head.appendChild(elem)
    }

    setTimeout(() => {
      this.refs.ccnumber.focus()
    }, 375)
  }

  deleteMethodHandler (id) {
    this.props.onBlock(ConfirmModal, {
      title: 'Delete?',
      text: 'Are you sure you want to delete this payment method?',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: () => {
        // TODO
      }
    })
  }

  verifyCCHandler (event) {
    event.target.value = event.target.value.replace(/\D/g, '').replace(/(\d{4}) ?/g, '$1 ').trim()
  }

  verifyExpiryHandler (event) {
    event.target.value = event.target.value.replace(/\D/g, '').replace(/^[^01]/, '').replace(/(\d{2})(\d+)/, '$1/$2')
  }

  verifyNoNumberHandler (event) {
    event.target.value = event.target.value.replace(/\D/g, '')
  }

  render () {
    const user = this.props.user

    return (
      <ModalOverlay
        title='Payment'
        backVisible={this.toShow(['addpayment', 'viewcampaign'])}
        onBack={this.backHandler.bind(this)}
        actionVisible={this.toShow('addpayment')}
        onAction={this.actionHandler.bind(this)}
        actionLabel={this.state.currentScene === 'addpayment' ? 'Add' : ''}
        loading={this.state.loading}>
        <ModalSlider
          from='left'
          cover
          render={this.toRender('overview')}
          visible={this.toShow('overview')}>
          <OptionList name={'Payment Methods'}>
            {user.paymentMethods.map((method) => <Method key={method.id}
              {...method}
              highlightDefault
              onClick={() => this.props.user.setDefaultPaymentMethod(method.id)}
              onDelete={() => this.props.user.deletePaymentMethod(method.id)} />
            )}
            <div className={payment.addpayment} onClick={this.addMethodHandler.bind(this)}>
              <span>Add payment method</span>
            </div>
          </OptionList>
        </ModalSlider>
        <ModalSlider
          from='right'
          cover
          render={this.toRender('addpayment')}
          visible={this.toShow('addpayment')}>
          <OptionList>
            <Option>
              <input
                ref='ccnumber'
                className={payment.ccnumber}
                type='text'
                placeholder='Credit card number'
                pattern='\d*'
                maxLength='19'
                onKeyUp={this.verifyCCHandler.bind(this)} />
            </Option>
            <OptionRow>
              <Option>
                <input
                  ref='expiry'
                  type='text'
                  placeholder='MM/YY'
                  pattern='\d*'
                  maxLength='5'
                  onKeyUp={this.verifyExpiryHandler.bind(this)} />
              </Option>
              <Option>
                <input
                  ref='cvv'
                  type='text'
                  placeholder='CVV'
                  pattern='\d*'
                  maxLength='4'
                  onKeyUp={this.verifyNoNumberHandler.bind(this)} />
              </Option>
              <Option>
                <input
                  ref='zip'
                  type='text'
                  placeholder='ZIP'
                  maxLength='7' />
              </Option>
            </OptionRow>
            <p>We will only charge your card upon purchase.</p>
          </OptionList>
        </ModalSlider>
      </ModalOverlay>
    )
  }

            // <h2>Discount codes</h2>
            // <div className={styles.optionlist}>
            //   <div className={payment.adddiscount}>
            //     <input type='text' placeholder='Enter new discount code' onKeyPress={this.addDiscountHandler.bind(this)} />
            //   </div>
            //   {user.discounts.map((method) => {
            //     return (
            //       <Method key={method.id} type='discount' onSelect={this.selectDiscountHandler.bind(this, method.name, method.description)} onDelete={this.deleteDiscountHandler.bind(this, method.id)}>
            //         {method.name}
            //       </Method>
            //     )
            //   })}
            // </div>

}
