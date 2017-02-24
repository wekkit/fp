import styles from './OrderProgress.css'

import React, { Component, PropTypes } from 'react'
import {observer} from 'mobx-react'

@observer
export default class OrderProgressView extends Component {

  render () {
    const purchase = this.props.purchase

    return <div className={styles[purchase.statusString]}>
      <button className={styles.button} onClick={() => purchase.purchase()}>
        <div className={styles.label}>Order Now</div>
      </button>
    </div>
  }

}

OrderProgressView.propTypes = {
  purchase: PropTypes.object.isRequired
}
