import styles from '../shared/Option/Option.css'
import methods from './Payment.css'

import React, { Component } from 'react'

export default class Method extends Component {

  deleteHandler (event) {
    event.stopPropagation()
    this.props.onDelete()
  }

  render () {
    const type = methods[(this.props.type || '').replace(/( |(\(.*\)))/g, '').toLowerCase()]

    return (
      <div className={methods.method + ' ' + (type || methods.default)} onClick={this.props.onSelect}>
        <span>{this.props.children}</span>
        {this.props.default ? <span className={styles.optioninfo}>Default Method</span> : <span />}
      </div>
    )
  }

  // <span className={styles.optiondelete} onClick={this.deleteHandler.bind(this)} />

}
