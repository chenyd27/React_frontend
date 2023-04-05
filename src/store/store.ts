import { configureStore } from '@reduxjs/toolkit'
import todoMvcReducer from './modules/todoStore'

export const store : any = configureStore({
    reducer : {
        todoMvcReducer : todoMvcReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


