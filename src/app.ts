import '@nutui/nutui-taro/dist/style.css'
import '@/app.scss'
import {
  Avatar,
  Button,
  Cell,
  CellGroup,
  Checkbox,
  Divider,
  Noticebar,
  Toast,
} from '@nutui/nutui-taro'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { useFavoriteStore } from '@/stores/favorite'
import { useUserStore } from '@/stores/user'

const App = createApp({
  onShow() {
    const userStore = useUserStore()
    const favoriteStore = useFavoriteStore()
    userStore.init()
    favoriteStore.init()
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})
const store = createPinia()

App.use(Avatar)
App.use(Button)
App.use(Cell)
App.use(CellGroup)
App.use(Divider)
App.use(Noticebar)
App.use(Checkbox)
App.use(Toast)

App.use(store)

export default App
