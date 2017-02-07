import styles from './Option.css'

import React, { Component, PropTypes } from 'react'

export default class OptionList extends Component {

  render () {
    return (
      <div className={styles.optionlist}>
        <h2>{this.props.name}</h2>
        <div className={styles.options}>
          {this.props.children}
        </div>
      </div>
    )
  }

}

OptionList.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node
}
