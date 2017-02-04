import styles from './../shared/styles/ModalStyles.css'

import React, { Component } from 'react'

export default class InfoModal extends Component {

  confirmHandler () {
    if (this.props.obj.buttonAction instanceof Function) {
      this.props.obj.buttonAction()
    }
    this.props.onClose()
  }

  render () {
    return (
      <div className={styles.modalcontainer}>
        <h1>{this.props.obj.title ? this.props.obj.title : 'Info'}</h1>
        <p>{this.props.obj.text}</p>
        <div className={styles.controls}>
          <button className={styles.button} onClick={this.confirmHandler.bind(this)}>{this.props.obj.buttonText ? this.props.obj.buttonText : 'Okay'}</button>
        </div>
      </div>
    )
  }

}
