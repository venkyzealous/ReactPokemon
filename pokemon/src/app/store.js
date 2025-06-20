// store containing postsSlice 

import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../features/posts/postsslice.js'
import authReducer from '../features/auth/authSlice.js'


export const store = configureStore({
    reducer:{
        posts : postsReducer,
        auth : authReducer
    },
});
  