// import React from 'react'
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTodo, fetchTodos } from "../Store/TodoSlice";
import { GoPlus } from "react-icons/go";
import toast from 'react-hot-toast';

function Todos() {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();
  // const {todos} = useSelector((state) => state.todo);//We use useSelector to access the state fro store

  useEffect(() => {
    // Check if there are todos in local storage
    const localTodos = JSON.parse(localStorage.getItem("todo"));

    if (localTodos && localTodos.length > 0) {
      // Use local todos if they exist
      dispatch({ type: "todo/setTodos", payload: localTodos });
    } else {
      // Fetch todos from the server if local todos don't exist
      dispatch(fetchTodos());
    }
  }, [dispatch]);

  
  const handleAddTodos = () => {
    if (!todo.trim()) {
      alert("Please enter a task");
      return;
    }

    // Create a new todo object
    const newTodo = {
      id: Math.floor(Math.random() * 1000),
      todo: todo,
      completed: false,
    };

    // Dispatch the addTodo action with the new todo
    dispatch(addTodo(newTodo));
    toast.success('Task added successfully');
    setTodo("");
  };

  

  return (
    <div className="addTodos">
      <input
        type="text"
        className="todo-input"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />

      <button className="add-btn" onClick={handleAddTodos}>
        <GoPlus />
      </button>
    </div>
  );
}

export default Todos;