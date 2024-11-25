import {configureStore} from '@reduxjs/toolkit'
import apiSlice from './apiSlice'
import deleteApiSlice from './deleteApiSlice'
import { setupListeners } from '@reduxjs/toolkit/query'

const store=configureStore({
        reducer:{
            [apiSlice.reducerPath]: apiSlice.reducer,
            [deleteApiSlice.reducerPath]: deleteApiSlice.reducer
        },
        middleware:(prevMiddleware)=> prevMiddleware().concat(apiSlice.middleware,deleteApiSlice.middleware),
})

setupListeners(store.dispatch);

export {store}