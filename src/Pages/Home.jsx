import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Todos from "../Components/Todos";
import DisplayTodos from "../Components/DisplayTodos";


function getUser() {
  let user = localStorage.getItem("user");

  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
}

const saveTodos = () => {
  let todos = localStorage.getItem("todos");

  if (todos) {
    todos = JSON.parse(todos);
  } else {
    todos = null;
  }
  return todos;
};

function Home() {
  const [user, setUser] = useState(getUser());
  const [todos, setTodos] = useState(saveTodos()); // Set todos state

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    // Update todos state when it changes
    const storedTodos = saveTodos();
    setTodos(storedTodos);
  }, []);

  return (
    <div>
      
      {user ? (
        <div>

          <header className="header">
            <h4>
              Hello, {user.firstName} {user.lastName}
            </h4>
            <button className="btn btn-secondary btn-md" onClick={handleLogout}>
              LOGOUT
            </button>
          </header>

          <div className="main">
            <h1>Task Management App</h1>
            <Todos />
            <DisplayTodos todos={todos} /> {/* Pass todos as props */}

          </div>
        </div>
      ) : (
        <Link to="/login" className="btn btn-primary btn-md">
          LOGIN
        </Link>
      )}
    </div>
  );
}

export default Home;
