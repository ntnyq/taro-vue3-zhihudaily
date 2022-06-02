import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {
  Avatar,
  Button,
  Cell,
  CellGroup,
  Checkbox,
  Divider,
  Icon,
  NoticeBar,
  Toast,
} from '@nutui/nutui-taro'
import { useUserStore } from '@/stores/user'
import { useFavoriteStore } from '@/stores/favorite'
import '@/app.scss'

const App = createApp({
  onShow () {
    const user = useUserStore()
    const favorite = useFavoriteStore()
    user.init()
    favorite.init()
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})
const store = createPinia()

App.use(Avatar)
App.use(Button)
App.use(Cell)
App.use(CellGroup)
App.use(Divider)
App.use(Icon)
App.use(NoticeBar)
App.use(Checkbox)
App.use(Toast)

App.use(store)

export default App
