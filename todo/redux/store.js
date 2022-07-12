import { configureStore } from "@reduxjs/toolkit"
import { configureStore } from "@reduxjs/toolkit"
import { authReducer, messageReducer } from "./reducer"

let store = configureStore({
    reducer: {
        auth: authReducer,
        message: messageReducer
    }
})

export default store