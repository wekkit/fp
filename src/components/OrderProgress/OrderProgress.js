import styles from './OrderProgress.css'

import React, { Component, PropTypes } from 'react'
import {observer} from 'mobx-react'

@observer
export default class OrderProgressView extends Component {

  render () {
    const purchase = this.props.purchase

    return <div className={styles[purchase.statusString]}>
      <div className={styles.pickupDuration}>
        <div className={styles.pickupLabel}>Pickup in</div>
        <div className={styles.pickupDurationInput}>
          <button className={styles.minus} onClick={(e) => { purchase.setPickupDuration(-5); e.preventDefault() }} />
          <span className={styles.pickupDurationMinutes}>
            {purchase.pickupDuration}
          </span>
          <button className={styles.plus} onClick={(e) => { purchase.setPickupDuration(5); e.preventDefault() }} />
        </div>
        <div className={styles.pickupLabel}>minutes</div>
      </div>
      <button className={styles.button} onClick={() => purchase.purchase()}>
        <div className={styles.label}>Order Now</div>
      </button>
    </div>
  }

}

OrderProgressView.propTypes = {
  purchase: PropTypes.object.isRequired
}
