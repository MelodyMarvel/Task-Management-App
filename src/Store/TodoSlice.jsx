import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//an asynchronous thunk action for fetching todos from an API 
export const fetchTodos = createAsyncThunk(
  'todo/fetchTodos',
  async () => {
    try {
      // Make a GET request to fetch todos
      const response = await axios.get('https://dummyjson.com/todos?limit=3&skip=10');
      const responseData = response.data; // Access the 'todos' array from api
      localStorage.setItem('todo', JSON.stringify(responseData.todos)); // Store the 'todos' array in local storage
      return responseData.todos; // Return the 'todos' array as the payload
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch todos. Please check your network or API configuration.');
    }
  }
);


//initial state for the todoSlice
const initialState = {
  todos: JSON.parse(localStorage.getItem('todo')) || [], 
  //This checks if there are todos stored in the local storage because we want 
  //to load todos from the local storage when the app start
};

//created todo slice using createSlice
const todoSlice = createSlice({
  name: "todo",
  initialState,

  //Reducers for handling synchronous actions
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      localStorage.setItem('todo', JSON.stringify(state.todos)); // Update local storage
    },
    removeTodos: (state, action) => {
      // Use filter to remove the todo with the matching ID
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem('todo', JSON.stringify(state.todos)); // Update local storage
    },
    updateTodos: (state, action) => {
      const { id, todo } = action.payload;
      const todoToUpdate = state.todos.find((todo) => todo.id === id);
      if (todoToUpdate) {
        todoToUpdate.todo = todo;
      }
      localStorage.setItem('todo', JSON.stringify(state.todos)); // Update local storage
    },
    completeTodos: (state, action) => {
      const { id } = action.payload;
      const todoToComplete = state.todos.find((todo) => todo.id === id);
      if (todoToComplete) {
        todoToComplete.completed = true;
      }
      localStorage.setItem('todo', JSON.stringify(state.todos)); // Update local storage
    },
  },


    //Extra reducers for handling asynchronous actions using createAsyncThunk
  extraReducers:(builder)=>{
    builder.addCase(fetchTodos.pending,(state)=>{
        state.loading=true;
        state.todos=null;
        state.error=null
    })
    .addCase(fetchTodos.fulfilled,(state,action)=>{
        state.loading=false;
        state.todos= action.payload // this contains whatever we return in the function above (return response) 
        state.error=null
    })
    .addCase(fetchTodos.rejected,(state,action)=>{
        state.loading=false;
        state.todos= null
        console.log(action.error.message)
        if(action.error.message=== "Request failed with status code 400"){
            state.error = "Access Denied! invalid Credentials"
        }
        else{
            state.error=action.error.message;
        }
    })
}
});

export const { addTodo, removeTodos, updateTodos, completeTodos } = todoSlice.actions;
export default todoSlice.reducer;