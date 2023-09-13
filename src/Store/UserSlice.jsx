// this method handle a specific section (user login) of our application's state
// we define 3 state here: loading, user and error
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//to call api for logging in users. we use creareAsyncThunk to Call API. then we call api using axios
export const loginUser=createAsyncThunk(
    'user/loginUser',
    async(userCredentials)=>{
        const request = axios.post('https://dummyjson.com/auth/login', userCredentials)
        //we get the reponse variable and set the data in the local storage  
            const response = await request;
            const responseData = response.data; // Access data property
            localStorage.setItem('user', JSON.stringify(responseData))
            return responseData;
    }
)


// Async thunk for user signup
export const signupUser=createAsyncThunk(
  'user/signupUser',
  async(userCredentials)=>{
      const request = axios.post('https://dummyjson.com/auth/login', userCredentials)
      //we get the reponse variable and set the data in the local storage  
          const response = await request;
          const responseData = response.data; // Access data property
          localStorage.setItem('user', JSON.stringify(responseData))
          return responseData;
  }
)

const initialState={
    loading: false,
    user: '',
    error: '',
}
const userSlice = createSlice({
    name: 'user',
    initialState,

    //we define additional reducers with 3 cases.
    extraReducers:(builder)=>{
        builder.addCase(loginUser.pending,(state)=>{
            state.loading=true;
            state.user=null;
            state.error=null
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user= action.payload //contains whatever we return in the function above (return response) 
            state.error=null
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading=false;
            state.user= null
            console.log(action.error.message)
            if(action.error.message=== "Request failed with status code 400"){
                state.error = "Access Denied! invalid Credentials"
            }
            else{
                state.error=action.error.message;
            }
        })
    

  // Signup cases
  .addCase(signupUser.pending, (state) => {
    state.loading = true;
    state.user = null;
    state.error = null;
  })
  .addCase(signupUser.fulfilled, (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.error = null;
  })
  .addCase(signupUser.rejected, (state, action) => {
    state.loading = false;
    state.user = null;
    if (action.error.message === 'Request failed with status code 400') {
      state.error = 'Signup failed! Invalid data.';
    } else {
      state.error = action.error.message;
    }
  });
},
});
// export const {addTodo}= userSlice.actions;
export default userSlice.reducer