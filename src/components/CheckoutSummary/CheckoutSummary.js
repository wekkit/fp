import styles from './CheckoutSummary.css'

import React, { Component } from 'react'
import FormatPrice from 'format-price'

export default class CheckoutSummary extends Component {

  render () {
    return (
      <div className={styles.checkoutSummary}>
        <button className={styles.button} onClick={this.props.onCheckout}>
          <span className={styles.quantity} data={this.props.quantity} />
          <span className={styles.label}>Checkout</span>
          <span className={styles.total}>{FormatPrice.format(this.props.locale.code, this.props.currency, (this.props.total / 100))}</span>
        </button>
      </div>
    )
  }

}
