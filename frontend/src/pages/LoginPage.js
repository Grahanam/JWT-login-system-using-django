import React,{useContext} from 'react'
import AuthContext from '../context/AuthContext'
import '../App.css'

const LoginPage = () => {
    let {loginUser}=useContext(AuthContext)
  return (
    <div className='outer-container'>
        <div>LoginPage</div>
        <form onSubmit={loginUser} className='container'>
            <input type="text" name="email" placeholder="Enter Email"/>
            <input type="password" name="password" placeholder="Enter Password"/>
            <input type="submit"/>
        </form>
    </div>
  )
}

export default LoginPage