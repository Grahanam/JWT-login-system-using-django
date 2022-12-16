import React from 'react'
import {useNavigate} from 'react-router-dom'

const SignupPage = () => {
  const navigate=useNavigate()
  let signup=async(e)=>{
    e.preventDefault()
    // console.log('data send')
    
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
        console.log(data.email)
        alert(data.email)
    }
  }
  return (
    <div>
        <div>SignupPage</div>
        <form onSubmit={signup}>
            <input type="text" name="email" placeholder="Enter Email"/>
            <input type="password" name="password" placeholder="Enter Password"/>
            <input type="submit"/>
        </form>

    </div>
  )
}

export default SignupPage