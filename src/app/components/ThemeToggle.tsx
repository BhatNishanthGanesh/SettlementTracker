"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "react-feather"

const ThemeToggle = () => {
    const [darkMode,setdarkMode]=useState(true)
    useEffect(()=>{
        const theme=localStorage.getItem("theme")
        if(theme==="dark"){
            setdarkMode(true)
        }
    },[])
    useEffect(()=>{
     if(darkMode){
        document.documentElement.classList.add('dark')
        localStorage.setItem("theme","dark")
     }else{
        document.documentElement.classList.remove('dark')
        localStorage.setItem("theme","light")  
     }
    },[darkMode])
  return (
    <div className="relative w-16 h-6 flex items-center dark:bg-gray-900 bg-teal-500 cursor-pointer rounded-full p-1" onClick={()=>setdarkMode(!darkMode)}>
      <Moon className="text-white" size={18}/>
      <div className="absolute bg-white  w-6 h-6 rounded-full shadow-md transform transition-transform duration-300" style={darkMode?{left:"2px"}:{right:"2px"}}>
      </div>
      <Sun className="ml-auto text-yellow-400" size={18}/>
    </div>
  )
}

export default ThemeToggle
