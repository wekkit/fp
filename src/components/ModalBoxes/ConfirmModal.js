/*
*
* Understands how to render a confirmation modal. Takes:
* - text: body text
* - onClose(): a closing function
* - onConfirm(): a confirmation function
* - title: a title (optional)
* - confirmation text (optional)
* - cancelation text (optional)
*
*/

import styles from './../shared/styles/ModalStyles.css'

import React, { Component } from 'react'

export default class ConfirmModal extends Component {

  confirmHandler () {
    this.props.onClose()
    this.props.obj.onConfirm()
  }

  closeHandler () {
    this.props.onClose()
    this.props.obj.onClose()
  }

  render () {
    return (
      <div className={styles.modalcontainer}>
        <h1>{this.props.obj.title ? this.props.obj.title : 'Info'}</h1>
        <p>{this.props.obj.text}</p>
        <div className={styles.controls}>
          <button className={styles.button} onClick={this.confirmHandler.bind(this)}>{this.props.obj.confirmText ? this.props.obj.confirmText : 'Okay'}</button>
          <button className={styles.cancel} onClick={this.props.obj.onClose ? this.closeHandler.bind(this) : this.props.onClose}>{this.props.obj.cancelText ? this.props.obj.cancelText : 'Cancel'}</button>
        </div>
      </div>
    )
  }

}
