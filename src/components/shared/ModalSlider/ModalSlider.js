import styles from './ModalSlider.css'

import React, { Component, PropTypes } from 'react'

export default class ModalSlider extends Component {

  render () {
    var className = this.props.from ? styles[this.props.from] : styles.bottom

    if (!this.props.visible) {
      className += ' ' + styles.hide
    }

    if (this.props.cover) {
      className += ' ' + styles.full
    }

    return this.props.render ? (
      <div className={className}>
        {this.props.children}
      </div>
    ) : <div className={className} />
  }

}

ModalSlider.propTypes = {
  from: PropTypes.string,
  cover: PropTypes.bool,
  render: PropTypes.bool,
  visible: PropTypes.bool
}
