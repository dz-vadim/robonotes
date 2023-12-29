import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {postAPI} from "../services/PostServise";
import {todoAPI} from "../services/TodoService";

const rootReducer = combineReducers({
    [postAPI.reducerPath]: postAPI.reducer,
    [todoAPI.reducerPath]: todoAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(todoAPI.middleware)
                .concat(postAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']