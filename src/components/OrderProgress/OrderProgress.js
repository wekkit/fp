import styles from './OrderProgress.css'

import React, { Component, PropTypes } from 'react'
import {observer} from 'mobx-react'

@observer
export default class OrderProgressView extends Component {

  render () {
    const purchase = this.props.purchase
    const progressPercent = 10

    return <div className={styles[purchase.statusString]}>
      <div className={styles.pickupDuration}>
        <div className={styles.progressBar}>
          <svg viewBox='0 0 200 200' version='1.1' xmlns='http://www.w3.org/2000/svg'>
            <circle r='90' cx='100' cy='100' fill='transparent' strokeDasharray='11.3, 11.3' strokeDashoffset='0' />
            <circle style={purchase.status === 3 ? {strokeDashoffset: 5.6548 * progressPercent} : {}} r='90' cx='100' cy='100' fill='transparent'
              strokeDasharray={purchase.status === 1 ? '11.3, 11.3' : '565.48'} strokeDashoffset='0' />
          </svg>
        </div>
        <div className={styles.pickupLabel}>Pickup in</div>
        <div className={styles.pickupDurationInput}>
          <button className={styles.minus} onClick={(e) => { purchase.duration -= 5 }} />
          <span className={styles.pickupDurationMinutes}>
            {purchase.status === 4 ? 0 : purchase.duration}
          </span>
          <button className={styles.plus} onClick={(e) => { purchase.duration += 5 }} />
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
