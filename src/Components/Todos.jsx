// import React from 'react'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../Store/TodoSlice";
import { GoPlus } from "react-icons/go";

function Todos() {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();
  const {todos} = useSelector((state) => state.todo);//We use useSelector to access the state fro store


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
    setTodo("");

    // dispatch(fetchTodos());

    // // Update local storage
    // const updatedTodos = [...todos, newTodo];
    // localStorage.setItem("todo", JSON.stringify(updatedTodos));
  };

  useEffect(() => {
    console.log("todos:", todos);
  }, []);

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