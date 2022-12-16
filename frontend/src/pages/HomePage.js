import React,{useState,useEffect} from 'react'
import FileUploader from '../components/FileUploader';
import axios from 'axios'
import '../App.css'

const HomePage=()=>{
    let [images,setImage]=useState([])
    let getimages=async()=>{
        let response=await axios.get('http://localhost:8000/api/images/')
        if(response.status===200){
            setImage(response.data)
        }
    }
    useEffect(()=>{
        getimages()
    },[])
    return(
        <div>
            <p>You are logged to the HomePage!</p>
            <div>  
                <FileUploader/>    
            </div>
            {images.map((image)=>(
                <div>{image.id}
                <div className='Image-container'>
                <img src={'http://localhost:8000'+image.thumbnail} alt='' className='thumbnail'/>
                <img src={'http://localhost:8000'+image.medium} alt='' className='medium'/>
                <img src={'http://localhost:8000'+image.large} alt='' className='large'/>
                <img src={'http://localhost:8000'+image.grayscale} alt='' className='grayscale'/>
                </div>
                </div>
            ))}
        </div>
    )
}

export default HomePage