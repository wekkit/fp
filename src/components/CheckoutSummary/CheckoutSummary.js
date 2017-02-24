import styles from './CheckoutSummary.css'

import React, { Component, PropTypes } from 'react'
import FormatPrice from 'format-price'

export default class CheckoutSummaryView extends Component {

  render () {
    return <div className={styles.checkoutSummary}>
      <button className={styles.button} onClick={this.props.onCheckout}>
        <span className={styles.quantity} data={this.props.quantity} />
        <span className={styles.label}>Checkout</span>
        <span className={styles.total}>{FormatPrice.format(this.props.locale.code, this.props.currency, (this.props.total / 100))}</span>
      </button>
    </div>
  }

}

CheckoutSummaryView.propTypes = {
  locale: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired
}
