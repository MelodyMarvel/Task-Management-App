import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signupUser } from '../Store/UserSlice'
import {useNavigate} from 'react-router-dom'
function Signup() {

  // states
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  //redux state... to get the loading and error from redux
  const{loading, error} = useSelector((state)=>state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignupEvent=(e)=>{
    e.preventDefault()
    let userCredentials={
      username, email, password
    }
    dispatch(signupUser(userCredentials)).then((result)=>{
      if(result.payload){
        setUserName('')
        setEmail('')
        setPassword('')
        navigate('/login')
      }
    })
  }
  return (
    <div className='wrapper'>
      <form className="form-group custom-form" onSubmit={handleSignupEvent}>
        <label>Username</label>
        <input type="text" required className="form-control" value={username} onChange={(e)=>setUserName(e.target.value)}/>
        <br />
        <label>Email</label>
        <input type="email" required className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <br />
        <label>Password</label>
        <input type="password" required className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <br />
        <button type="submit" className="btn btn-success btn-md">{loading?'Loading...':'Signup'}</button>
        {error &&(
          <div className='alert alert-danger' role='alert'>{error}</div>
        )}
    </form>
    </div>
    
  )
}

export default Signup