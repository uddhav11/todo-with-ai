import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice.js'
import taskReducer from './taskSlice.js'

export const store= configureStore({
    reducer: {
        auth: authSlice,
        tasks: taskReducer,
    },
})