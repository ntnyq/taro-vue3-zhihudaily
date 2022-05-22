import { createApp } from 'vue'
import {
  Avatar,
  Button,
  Cell,
  CellGroup,
  Divider,
  Icon,
  NoticeBar,
  Toast,
} from '@nutui/nutui-taro'

import './app.scss'

const App = createApp({
  onShow () {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(Avatar)
App.use(Button)
App.use(Cell)
App.use(CellGroup)
App.use(Divider)
App.use(Icon)
App.use(NoticeBar)
App.use(Toast)

export default App
