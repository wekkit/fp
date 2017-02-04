import styles from './Option.css'

import React, { Component, PropTypes } from 'react'

export default class OptionRow extends Component {

  render () {
    return (
      <div className={styles.optionrow}>
        {this.props.children}
      </div>
    )
  }

}

OptionRow.propTypes = {
  children: PropTypes.node
}
