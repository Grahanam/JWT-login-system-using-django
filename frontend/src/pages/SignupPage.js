import React from 'react'
import {useNavigate} from 'react-router-dom'
import '../App.css'

const SignupPage = () => {
  const navigate=useNavigate()
  let signup=async(e)=>{
    e.preventDefault()
    console.log('data send')
    if(e.target.password.value!==e.target.cpassword.value)
      alert('Passwords did not match !!')
    else{
    let response =await fetch('http://localhost:8000/api/create/',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({'email':e.target.email.value,'password':e.target.password.value})
    })
    let data=await response.json()
    if(response.status===201){
        navigate('/login')
    }else{
        alert(data.password)
      
    }
  }
  }
  return (
    <div className='outer-container'>
        <div>SignupPage</div>
        <form onSubmit={signup} className="container">
            <input type="email" name="email" placeholder="Enter Email"/>
            <input type="password" name="password" placeholder="Enter Password"/>
            <input type="password" name="cpassword" placeholder="Re-enter Password"/>
            <input type="submit"/>
        </form>

    </div>
  )
}

export default SignupPage