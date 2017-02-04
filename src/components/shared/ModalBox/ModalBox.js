import styles from './ModalBox.css'

import React, { Component, PropTypes } from 'react'

export default class ModalBox extends Component {

  render () {
    const size = this.props.size ? this.props.size : 'normal'
    var className = styles[size]

    if (!this.props.visible) {
      className += ' ' + styles.hidden
    }

    return this.props.render ? (
      <div className={styles.modalbox}>
        <div className={className}>
          {this.props.children}
        </div>
      </div>
    ) : <div />
  }

}

ModalBox.propTypes = {
  size: PropTypes.string,
  visible: PropTypes.bool,
  render: PropTypes.bool,
  children: PropTypes.node
}
