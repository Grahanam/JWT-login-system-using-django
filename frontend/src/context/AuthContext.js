import React,{useState,useEffect,createContext } from 'react'
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom'


const AuthContext =createContext()

export default AuthContext

export const AuthProvider=({children})=>{

    
    let [authTokens,setAuthTokens]=useState(()=>localStorage.getItem('authTokens')?JSON.parse(localStorage.getItem('authTokens')): null)
    let [user,setUser]=useState(()=>localStorage.getItem('authTokens')?jwt_decode(localStorage.getItem('authTokens')): null)
    let [loading,setLoading]=useState(true)
    const navigate=useNavigate()
    
    

    let loginUser=async(e)=>{
        e.preventDefault()
        let response=await fetch('http://localhost:8000/api/token/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'email':e.target.email.value,'password':e.target.password.value})
        })
        let data=await response.json()
        if(response.status===200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            navigate('/')
        }else{
            alert('Incorrect Email or Password!')
        }    
    }
    let logoutUser=()=>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    

    let contextData={
        loginUser:loginUser,
        user:user,
        authTokens:authTokens,
        logoutUser:logoutUser,
        
    }
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
        }
    // function getCookie(name) {
    //     var cookieValue = null;
    //     if (document.cookie && document.cookie !== '') {
    //         var cookies = document.cookie.split(';');
    //         for (var i = 0; i < cookies.length; i++) {
    //             var cookie = jQuery.trim(cookies[i]);
    //             if (cookie.substring(0, name.length + 1) === (name + '=')) {
    //                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
    //                 break;
    //             }
    //         }
    //     }
    //     return cookieValue;
    // }

    useEffect(()=>{
        // let AuthTokens=localStorage.getItem('authTokens')?JSON.parse(localStorage.getItem('authTokens')):null
        var csrftoken = getCookie('csrftoken');
        let updateToken=async()=>{
            let response=await fetch('http://localhost:8000/api/token/refresh/',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'x-CSRFToken':csrftoken,
                },
                
                body:JSON.stringify({'refresh':authTokens?.refresh})
            })
            let data=await response.json()
            if(response.status===200){
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authTokens',JSON.stringify(data))
            }else{
                // logoutUser()
                setAuthTokens(null)
                setUser(null)
                localStorage.removeItem('authTokens')
                // window.location.replace = "http://localhost:3000/login/";
                // navigate('/login')
            }
    
            if(loading){
                setLoading(false)
            }
        }
       if (loading){
          updateToken()
       }
        
       let fourMinutes=1000*60*4
       let interval=setInterval(()=>{
        if(authTokens){
            updateToken()
        }
       },fourMinutes)
       return ()=> clearInterval(interval)
    },[authTokens,loading])

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? null:children}
        </AuthContext.Provider>
    )
}