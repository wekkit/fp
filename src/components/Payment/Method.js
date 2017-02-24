import styles from './Payment.css'

import React, { Component, PropTypes } from 'react'
import Option from '../shared/Option/Option.js'

export default class Method extends Component {

  render () {
    const type = (this.props.type || '').replace(/( |(\(.*\)))/g, '').toLowerCase()
    const defaultMethod = this.props.highlightDefault && this.props.default

    return <Option onClick={this.props.onClick}
      onDelete={this.props.onDelete}
      selectable={this.props.onClick instanceof Function}
      deletable={this.props.onDelete instanceof Function}>
      <div className={styles.method + ' ' + (styles[type] || styles.other)}>
        {type === 'applepay' ? 'Apple Pay'
          : (type === 'paypal' ? 'PayPal' : '**** ' + this.props.last4)}
      </div>
      {defaultMethod && <div className={styles.default}>Default</div>}
    </Option>
  }

}

Method.propTypes = {
  default: PropTypes.bool,
  highlightDefault: PropTypes.bool,
  type: PropTypes.string.isRequired,
  last4: PropTypes.string,
  onClick: PropTypes.func,
  onDelete: PropTypes.func
}
