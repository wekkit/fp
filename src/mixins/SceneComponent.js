import React from 'react'

export default class SceneComponent extends React.Component {

  componentWillUpdate (nextProps, nextState) {
    this.transitionScene(nextState)
  }

  navigateHandler (scene) {
    if (this.state.currentScene !== scene) {
      this.setState({nextScene: scene})
    }
  }

  transitionScene (nextState) {
    if (nextState.nextScene !== '') {
      setTimeout(() => {
        if (this.state.nextScene !== '') {
          this.setState({currentScene: this.state.nextScene, nextScene: ''})
        }
      }, 125)
    }
  }

  toRender (scene) {
    if (!(scene instanceof Array)) {
      scene = [scene]
    }
    return scene.find((x) => this.state.currentScene === x || this.state.nextScene === x) !== undefined
  }

  toShow (scene) {
    if (this.state.nextScene) {
      return false
    }
    if (!(scene instanceof Array)) {
      scene = [scene]
    }
    return scene.find((x) => this.state.currentScene === x) !== undefined
  }
}
