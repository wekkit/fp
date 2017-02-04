import styles from './Option.css'

import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import Swipeable from 'react-swipeable'

@observer
export default class Option extends Component {

  constructor (props) {
    super(props)

    this.state = {
      showDelete: false
    }
  }

  onClickHandler () {
    if (this.state.showDelete) {
      this.onShowDeleteHandler(false)
    } else if (this.props.onClick instanceof Function) {
      this.props.onClick()
    }
  }

  onShowDeleteHandler (show) {
    if (!this.props.deletable) {
      return
    }
    var newState = show !== undefined ? !!show : !this.state.showDelete
    this.setState({
      showDelete: newState
    })
    if (this.props.onShowDelete instanceof Function) {
      this.props.onShowDelete(newState)
    }
  }

  onDeleteHandler () {
    this.setState({
      showDelete: false
    })
    if (this.props.onDelete instanceof Function) {
      this.props.onDelete()
    }
  }

  render () {
    return (
      <Swipeable className={
          (this.props.deleted ? styles.deleted
          : (this.state.showDelete ? styles.showdelete
          : (!this.props.deletable ? styles.option : styles.deleteable)))
        }
        onClick={this.onClickHandler.bind(this)}
        onSwipedLeft={this.onShowDeleteHandler.bind(this, true)}
        onSwipedRight={this.onShowDeleteHandler.bind(this, false)}>
        {this.props.children}
        <div className={styles.deletebutton} onClick={this.onDeleteHandler.bind(this)}><span>Delete</span></div>
      </Swipeable>
    )
  }
}

Option.propTypes = {
  deletable: PropTypes.bool,
  onDelete: PropTypes.func,
  onShowDelete: PropTypes.func,
  onClick: PropTypes.func,
  children: PropTypes.node
}
