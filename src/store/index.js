import { configureStore } from '@reduxjs/toolkit'
import NewMailPopup from './reducers/NewMailPopup'

const Store =  configureStore({
  reducer: {
    'newMailPopup' : NewMailPopup
  },
})

export default Store