import styles from './App.css'

import React from 'react'
import SceneComponent from '../mixins/SceneComponent.js'
import Config from 'config'
import { observer } from 'mobx-react'

// Shared components
import ModalSlider from './shared/ModalSlider/ModalSlider.js'
import ModalBox from './shared/ModalBox/ModalBox.js'

//  Nav elements
import HeaderHomeNav from './HeaderNav/HomeNav.js'
import CheckoutSummary from './CheckoutSummary/CheckoutSummary.js'
import MainNav from './MainNav/MainNav.js'

// Modals
import InfoModal from './ModalBoxes/InfoModal.js'

// Views
import CheckoutView from './Checkout/Checkout.js'
import ShopView from './Shop/Shop.js'
import ProfileView from './Profile/Profile.js'
import OrdersView from './Orders/Orders.js'
import PaymentView from './Payment/Payment.js'
// import ShareView from './Share/Share.js'

const timeUpdateInterval = 10000

@observer
export default class App extends SceneComponent {

  constructor (props) {
    super(props)

    var now = (new Date()).getTime()

    this.state = {
      currentScene: 'home',
      nextScene: '',
      mainNavVisible: false,
      blockingModal: '',
      blockingModalVisible: false,
      blockingModalObj: null,
      now: now,
      currentPosition: undefined,
      loading: false
    }
  }

  componentDidMount () {
    this._timeOut = setTimeout(this.timeUpdate.bind(this), timeUpdateInterval)

    window.onfocus = this.timeUpdate.bind(this)
    window.onblur = () => { clearTimeout(this._timeOut) }
  }

  componentWillUpdate (nextProps, nextState) {
    this.transitionScene(nextState)

    if (nextState.blockingModal !== '' && !nextState.blockingModalVisible) {
      if (nextState.blockingModal !== this.state.blockingModal) {
        setTimeout(() => {
          if (nextState.blockingModalVisible === this.state.blockingModalVisible) {
            this.setState({blockingModalVisible: true, mainNavVisible: false})
          }
        }, 125)
      } else if (nextState.blockingModalVisible !== this.state.blockingModalVisible) {
        setTimeout(() => {
          if (nextState.blockingModal === this.state.blockingModal) {
            this.setState({blockingModal: ''})
          }
        }, 250)
      }
    }
  }

  timeUpdate () {
    this.setState({
      now: (new Date()).toJSON()
    })
    console.log('Now update...')
    this._timeOut = setTimeout(this.timeUpdate.bind(this), timeUpdateInterval)
  }

  blockingModalOpenHandler (modal, obj = {}) {
    this.setState({blockingModal: modal, blockingModalObj: obj})
  }

  blockingModalCloseHandler () {
    this.setState({blockingModalVisible: false})
  }

  purchaseHandler () {
    // const purchase = this.props.purchaseStore.purchase
    // const user = this.props.userStore.user

    if (Config.disableBooking) {
      this.blockingModalOpenHandler(InfoModal, {
        title: 'Booking',
        text: 'Sorry, booking is currently not available.'
      })
      setTimeout(() => this.cancelBookHandler(), 1000)
      return
    }
  }

  toggleMainMenuHandler () {
    this.setState({mainNavVisible: !this.state.mainNavVisible})
  }

  locateHandler (callback = (() => {})) {
    if (this._watchLocation === undefined && 'geolocation' in navigator) {
      this._watchLocation = navigator.geolocation.watchPosition((pos) => {
        const newstate = {
          currentPosition: pos.coords.latitude + ',' + pos.coords.longitude
        }
        this.setState(newstate)
        callback(null, newstate)
      }, (error) => {
        this._watchLocation = false
        this.blockingModalOpenHandler(InfoModal, {
          title: 'Location',
          text: 'Please enable location services for forpickup.co in your browser settings.'
        })
        callback(error)
      }, {
        enableHighAccuracy: true
      })
    } else if (this._watchLocation) {
      callback(null, {
        currentPosition: this.state.currentPosition
      })
    }
  }

  toggleLoadingHandler (loading) {
    this.setState({
      loading: loading !== undefined ? !!loading : !this.state.loading
    })
  }

  render () {
    return (
      <div className={styles.app}>
        <div className={this.props.errorStore.error.message ? styles.showerror : styles.hideerror}>{this.props.errorStore.error.message}</div>
        <div className={(this.state.blockingModalVisible ? styles.inactive : styles.active)}>
          <ShopView
            purchase={this.props.purchaseStore.purchase}
            now={this.state.now}
            currentPosition={this.state.currentPosition}
            onLocate={this.locateHandler.bind(this)}
            onBlock={this.blockingModalOpenHandler.bind(this)}
            />
          <ModalSlider
            from='top'
            render={this.toRender('home')}
            visible={this.toShow('home')}>
            <HeaderHomeNav
              onToggleMainMenu={this.toggleMainMenuHandler.bind(this)} />
          </ModalSlider>
          <ModalSlider
            from='bottom'
            render={this.toRender('home')}
            visible={this.toShow('home') && this.props.purchaseStore.purchase.items.length > 0}>
            <CheckoutSummary
              quantity={this.props.purchaseStore.purchase.quantity}
              total={this.props.purchaseStore.purchase.total}
              locale={this.props.purchaseStore.purchase.locale}
              currency={this.props.purchaseStore.purchase.currency}
              onCheckout={this.navigateHandler.bind(this, 'checkout')} />
          </ModalSlider>
          <ModalSlider
            cover
            render={this.toRender('checkout')}
            visible={this.toShow('checkout')}>
            <CheckoutView
              purchase={this.props.purchaseStore.purchase}
              onClose={this.navigateHandler.bind(this, 'home')}
              onBlock={this.blockingModalOpenHandler.bind(this)} />
          </ModalSlider>
          <ModalSlider
            cover
            render={this.toRender('profile')}
            visible={this.toShow('profile')}>
            <ProfileView
              user={this.props.userStore.user}
              onClose={this.navigateHandler.bind(this, 'home')}
              onBlock={this.blockingModalOpenHandler.bind(this)} />
          </ModalSlider>
          <ModalSlider
            cover
            render={this.toRender('orders')}
            visible={this.toShow('orders')}>
            <OrdersView
              onClose={this.navigateHandler.bind(this, 'home')}
              onBlock={this.blockingModalOpenHandler.bind(this)} />
          </ModalSlider>
          {/* <ModalSlider
            cover
            render={this.toRender('share')}
            visible={this.toShow('share')}>
            <ShareView
              user={this.props.userStore.user}.
              onClose={this.navigateHandler.bind(this, 'home')} /
          </ModalSlider>
          */}
          <ModalSlider
            cover
            render={this.toRender('payment')}
            visible={this.toShow('payment')}>
            <PaymentView
              user={this.props.userStore.user}
              now={this.state.now}
              onLoading={this.toggleLoadingHandler.bind(this)}
              onClose={this.navigateHandler.bind(this, 'home')}
              onBlock={this.blockingModalOpenHandler.bind(this)} />
          </ModalSlider>
        </div>
        <ModalSlider
          from='left'
          cover
          render
          visible={this.state.mainNavVisible}
          unslide='true'>
          <MainNav
            onNavigate={this.navigateHandler.bind(this)}
            onToggleMainMenu={this.toggleMainMenuHandler.bind(this)}
            onBlock={this.blockingModalOpenHandler.bind(this)} />
            inactive={this.state.blockingModalVisible} />
        </ModalSlider>
        <ModalBox
          render={!!this.state.blockingModal}
          size={this.state.blockingModalObj && this.state.blockingModalObj.size}
          visible={this.state.blockingModalVisible}>
          <this.state.blockingModal
            obj={this.state.blockingModalObj}
            onClose={this.blockingModalCloseHandler.bind(this)} />
        </ModalBox>
      </div>
    )
  }

}
