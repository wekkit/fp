import styles from './ModalOverlay.css'

import React, { Component, PropTypes } from 'react'
import Swipeable from 'react-swipeable'

export default class ModalOverlay extends Component {

  render () {
    return (
      <Swipeable
        className={styles.modaloverlay}
        onSwipedDown={this.props.onBack}
        onSwipedRight={this.props.onBack}
        preventDefaultTouchmoveEvent={false}
        delta={330}>
        <div className={styles.header}>
          <div className={this.props.backVisible ? styles.back : styles.close} onClick={this.props.onBack} />
          <h1>{this.props.title}</h1>
          <div className={styles.action + (this.props.actionVisible ? '' : ' ' + styles.hidden) + ((this.props.loading ? ' ' + styles.loading : ''))} onClick={this.props.onAction}>{this.props.loading ? '' : this.props.actionLabel}</div>
        </div>
        <div className={styles.body}>
          {this.props.children}
        </div>
      </Swipeable>
    )
  }

}

ModalOverlay.propTypes = {
  onBack: PropTypes.func.isRequired,
  backVisible: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onAction: PropTypes.func,
  actionVisible: PropTypes.bool,
  actionLabel: PropTypes.string,
  loading: PropTypes.bool,
  children: PropTypes.node
}
