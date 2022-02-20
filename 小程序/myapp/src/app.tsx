import { Component } from 'react'
import { Provider } from 'mobx-react'

import counterStore from './store/counter'
import HomeStore from './store/home'
import AboutStore from './store/about'

import './app.less'

const store = {
  counterStore,
  HomeStore,
  AboutStore
}

class App extends Component {
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 就是要渲染的页面
  render () {
    return (
      // 注入store
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
