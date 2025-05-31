import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice';
import appReducer from './appSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    app: appReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export * from './counterSlice';
export * from './appSlice';