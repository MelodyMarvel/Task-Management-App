import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { completeTodos, removeTodos, updateTodos } from "../Store/TodoSlice";
import TodoItem from "./TodoItem";


function DisplayTodos() {
  const [sort, setSort] = useState("active");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo);

  const handleDeleteTodo = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      dispatch(removeTodos(id));
    }
    dispatch(removeTodos(id));
  };

  const handleUpdateTodo = (id, updatedItem) => {
    dispatch(updateTodos({ id, todo: updatedItem }));
  };

  const handleCompleteTodo = (id) => {
    dispatch(completeTodos({ id }));
  };

  const isActive = (filter) => filter === sort; // Check if the filter matches the current sort

  // Use an empty dependency array to run this effect only once
  useEffect(() => {
    console.log("todos:", todos);
  }, [todos]);

  const filteredTodos = Array.isArray(todos.todos)
    ? todos.todos.filter((todo) => {
        if (sort === "active") {
          return !todo.completed;
        } else if (sort === "completed") {
          return todo.completed;
        }
        return true;
      })
    : [];

  return (
    <div className="displaytodos">
      <div className="buttons">
        <button
          onClick={() => setSort("active")}
          className={isActive("active") ? "active-button " : ""}
        >
          Active
        </button>
        <button
          onClick={() => setSort("completed")}
          className={isActive("completed") ? "active-button " : ""}
        >
          Completed
        </button>
        <button
          onClick={() => setSort("all")}
          className={isActive("all") ? "active-button " : ""}
        >
          All
        </button>
      </div>
      <ul>
        {filteredTodos.length > 0
          ? filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                handleUpdateTodo={handleUpdateTodo}
                handleCompleteTodo={handleCompleteTodo}
                handleDeleteTodo={handleDeleteTodo}
              />
            ))
          : null}

      </ul>

    </div>
  );
}

export default DisplayTodos;
