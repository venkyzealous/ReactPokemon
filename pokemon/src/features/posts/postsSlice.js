 //you will use createSlice from Redux Toolkit to define the state for posts (an array of posts, a loading status, etc.)
 //  and the "reducers" that can change it.

 //You will also use createAsyncThunk here to define the logic for fetching the data from the API.
 //  This is the Redux way of handling async operations like we did in useEffect.

 //npm install @reduxjs/toolkit react-redux
//in store.js
 //import { configureStore } from '@reduxjs/toolkit';
 //In store.js register reducers
 //import pizzaReducer from './pizzaSlice'
 //export const store = configureStore({}
//    reducer: {
//      pizza: pizzaReducer,
//},

 // });

 //main.js
 // <Provider store = {store}>
 // <App />
 // </Provider>

//slice.js
// import { createSlice } from '@reduxjs/toolkit' 
// const initialState = {
//     toppings: ['pepperoni'], 
//     gluten: true 
// }

//  export const pizzaSlice = createSlice({
//     name: 'pizza' 
//     initialState, 
//     reducers: { 
//         toggleGluten: (state) => {
//             state.gluten = !state. gluten 
//         }
//         addTopping: (state, action) => {
//             state.toppings = [...state.toppings,action.payload]
//         }
//     }
// }


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    post : null,
    isLoading: true
}

export const fetchData = createAsyncThunk("posts/fetchData", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    if(!response.ok){
        throw new Error("Error in fetching data");
    }
    const data = await response.json();
    return data;
});



export const postsSlice = createSlice({
    name: "posts",
    initialState, 
    reducers: {
        setLoading: (state,action) => {
            state.isLoading = action.payload;
        },
        setPost: (state,action) => {
            state.post = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.post = action.payload;
        });
        builder.addCase(fetchData.rejected, (state) => {
            state.isLoading = false;
            state.post = null
        });
    },
});

export const {setLoading,setPost} = postsSlice.actions
export default postsSlice.reducer