import styles from './MainNav.css'

import React, { Component } from 'react'
import Swipeable from 'react-swipeable'

export default class MainNav extends Component {
  navigateHandler (scene, event) {
    this.props.onNavigate(scene)
  }

  render () {
    return (
      <Swipeable
        className={this.props.inactive ? styles.mainnav + ' ' + styles.inactive : styles.mainnav}
        onClick={this.props.onToggleMainMenu}
        onSwipedLeft={this.props.onToggleMainMenu}>
        <nav className={styles.menu}>
          <div className={styles.headitem}>
            <div className={styles.headimg}>forpickup</div>
            <div className={styles.headslogan}>Your favorite food,<br/>ready when you arrive</div>
          </div>
          <div className={styles.item} onClick={this.navigateHandler.bind(this, 'profile')}>Profile</div>
          <div className={styles.item} onClick={this.navigateHandler.bind(this, 'orders')}>Order history</div>
          <div className={styles.item} onClick={this.navigateHandler.bind(this, 'payment')}>Payment</div>
        </nav>
      </Swipeable>
    )
  }

}
