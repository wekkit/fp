import React from 'react'
import SceneComponent from '../../mixins/SceneComponent.js'
import {observer} from 'mobx-react'

import Utils from 'utils'

import OptionList from '../shared/Option/OptionList.js'
import Option from '../shared/Option/Option.js'
import ModalSlider from '../shared/ModalSlider/ModalSlider.js'
import ModalOverlay from '../shared/ModalOverlay/ModalOverlay.js'
import ConfirmModal from '../ModalBoxes/ConfirmModal.js'

@observer
export default class ProfileView extends SceneComponent {

  constructor (props) {
    super(props)

    this.state = {
      currentScene: 'overview',
      nextScene: '',
      edited: false,
      loading: false
    }
  }

  backHandler () {
    if (this.state.currentScene === 'overview') {
      this.props.onClose()
      if (this.state.edited) {
        this.props.user.load() // resetting from server
      }
    } else {
      this.navigateHandler('overview')
    }
  }

  actionHandler () {
    this.setState({loading: true})
    this.props.user.save((error, user) => {
      if (!error) {
        this.setState({edited: false})
      } else {
        this.setState({loading: false})
      }
    })
  }

  editPropertyHandler (property, event) {
    if (event.which === 13) { // indicates that user hit the enter key
      event.target.blur()
    }

    this.props.user[property] = event.target.value.trim()
    this.setState({edited: true, loading: false})
  }

  phoneEditHandler (event) {
    this.editPropertyHandler('phone', {target: {value: event.target.value.replace(/[() ]/g, '')}})
    event.target.value = Utils.formatPhoneNumber(event.target.value)
  }

  logoutHandler () {
    this.props.onBlock(ConfirmModal, {
      title: 'End session?',
      text: 'Are you sure you want to logout?',
      confirmText: 'Logout',
      cancelText: 'Cancel',
      onConfirm: () => {
        this.props.user.logout()
      }
    })
  }

  render () {
    const user = this.props.user

    return (
      <ModalOverlay
        title={'Profile'}
        backVisible={false}
        onBack={this.backHandler.bind(this)}
        actionVisible={this.toShow('overview') && this.state.edited}
        onAction={this.actionHandler.bind(this)}
        actionLabel={this.state.currentScene === 'overview' ? 'Save' : ''}
        loading={this.state.loading}>
        <ModalSlider
          from='left'
          cover={!false}
          render={this.toRender('overview')}
          visible={this.toShow('overview')}>
          <OptionList name={'Your name'}>
            <Option>
              <input
                type='text'
                placeholder='First name'
                defaultValue={user.first_name}
                onKeyUp={this.editPropertyHandler.bind(this, 'first_name')} />
              <input
                type='text'
                placeholder='Last name'
                defaultValue={user.last_name}
                onKeyUp={this.editPropertyHandler.bind(this, 'last_name')} />
            </Option>
          </OptionList>
          <OptionList name={'Contact information'}>
            <Option>
              <input
                type='email'
                placeholder='Email address'
                defaultValue={user.email} />
            </Option>
            <Option>
              <input
                type='text'
                placeholder='Phone number'
                pattern='\d*'
                maxLength='17'
                defaultValue={Utils.formatPhoneNumber(user.phone)}
                onKeyUp={this.phoneEditHandler.bind(this)} />
            </Option>
          </OptionList>
        </ModalSlider>
      </ModalOverlay>
    )
  }

}
