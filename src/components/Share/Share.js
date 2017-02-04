import styles from './Share.css'

import React, { Component } from 'react'
import {ShareButtons, generateShareIcon} from 'react-share'
import Config from 'config'

import OptionList from '../shared/Option/OptionList.js'
import Option from '../shared/Option/Option.js'
import ModalOverlay from '../shared/ModalOverlay/ModalOverlay.js'

const {FacebookShareButton, TwitterShareButton, LinkedinShareButton} = ShareButtons

const FacebookIcon = generateShareIcon('facebook')
const TwitterIcon = generateShareIcon('twitter')
const LinkedinIcon = generateShareIcon('linkedin')

export default class ShareView extends Component {

  constructor (props) {
    super(props)

    this.state = {
      revealCode: false
    }
  }

  componentDidMount () {
    setTimeout(() => {
      this.toggleRevealCodeHandler()
    }, 300)
  }

  toggleRevealCodeHandler () {
    this.setState({revealCode: !this.state.revealCode})
  }

  selectCodeHandler (event) {
    event.target.setSelectionRange(0, 99)
  }

  render () {
    return (
      <ModalOverlay title='Share' onBack={this.props.onClose}>
        <OptionList>
          <Option>
            <input type='text' value={Config.referralLink + this.props.user.referral_code} readOnly onClick={this.selectCodeHandler} />
          </Option>
          <div className={styles.socialOption}>
            <FacebookShareButton
              url={Config.referralLink + this.props.user.referral_code}
              title={'Refer a friend'}>
              <FacebookIcon
                size={32}
                round />
            </FacebookShareButton>
            <TwitterShareButton
              url={Config.referralLink + this.props.user.referral_code}
              title={'Refer a friend'}
              >
              <TwitterIcon
                size={32}
                round />
            </TwitterShareButton>
            <LinkedinShareButton
              url={Config.referralLink + this.props.user.referral_code}
              title={'Refer a friend'}
              >
              <LinkedinIcon
                size={32}
                round />
            </LinkedinShareButton>
          </div>
        </OptionList>
        <p>Spread the word and share this code with your friends!</p>
      </ModalOverlay>
    )
  }

}
