import React from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from './UserContext';

function Loginpage() {
  const {userInfo,setUserInfo} = useContext(UserContext);
  const [username,setUserName] = React.useState('')
  const [password,setPassword] = React.useState('')
  const [redirect,setRedirect] = React.useState(false);
  const inputStyle = `p-2 mb-[20px] rounded-sm border-solid border-2 border-gray-700 w-[80%] md:w-[60%]`

  function login(e){
    e.preventDefault()
     axios.post('http://localhost:3000/login',{username,password},{withCredentials:true})
     .then(res=>
        { 
          setUserInfo(res.data)
          setRedirect(true)
        }
    )
     .catch(err=>
     console.log(err)
    )
  }
  if(redirect){
    return <Navigate to={"/"} />
  }

  return (
  
        <form action="" onSubmit={(e)=>login(e)} className='flex flex-col items-center'>
            <h1 className='text-2xl font-bold mb-[35px]'>Login</h1>
            <input 
              type="text" 
              placeholder='username' 
              className={inputStyle}
              onChange={(e)=>setUserName(e.target.value)} />

              <input 
              type="password" 
              placeholder='password'
              className={inputStyle}
              onChange={(e)=>setPassword(e.target.value)} />
            <button className={inputStyle+` bg-gray-700 + text-white`}>Login</button>
        </form>
    
  )
}

export default Loginpage