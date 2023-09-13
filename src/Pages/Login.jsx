import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../Store/UserSlice'
import {Link, useNavigate} from 'react-router-dom'
function Login() {

  // states
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')


  //redux state... to get the loading and error from redux
  const{loading, error} = useSelector((state)=>state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLoginEvent=(e)=>{
    e.preventDefault()
    let userCredentials={
      username, password
    }
    dispatch(loginUser(userCredentials)).then((result)=>{
      if(result.payload){
        setUserName('')
        setPassword('')
        navigate('/')
      }
    })
  }
  return (
    <div className='wrapper'>
      <form className="form-group custom-form" onSubmit={handleLoginEvent}>
        <label>Username</label>
        <input type="text" required className="form-control" value={username} onChange={(e)=>setUserName(e.target.value)}/>
        <br />
        <label>Password</label>
        <input type="password" required className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <br />
        <button type="submit" className="btn btn-success btn-md">{loading?'Loading...':'Login'}</button>
        {error &&(
          <div className='alert alert-danger' role='alert'>{error}</div>
        )}
        <p>Dont have an account... <Link to="/signup" className="signupLink">Signup</Link></p>
    </form>
    </div>
    
  )
}

export default Login