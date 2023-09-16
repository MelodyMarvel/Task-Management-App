import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/SignUp'
import { Toaster } from 'react-hot-toast';
import TodoDetails from './Pages/TodoDetails'




function App({ handleDeleteTodo, handleUpdateTodo}) {
  const todo = {
    id: 1,
    todo: "Todo",
    completed: false,
  };

  return (
    <div>

      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/details/:id' element={<TodoDetails handleUpdateTodo={handleUpdateTodo} handleDeleteTodo={handleDeleteTodo} />}
 />
        </Routes>
      </Router>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: '1rem',
          },
        }}
      />
    </div>
  )
}

export default App
