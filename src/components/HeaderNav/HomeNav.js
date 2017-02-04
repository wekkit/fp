import styles from './HeaderNav.css'

import React, { Component } from 'react'

export default class HomeNav extends Component {

  render () {
    return (
      <div className={styles.headernav}>
        <div className={styles.menubutton} onClick={this.props.onToggleMainMenu}></div>
      </div>
    )
  }

}
