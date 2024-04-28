import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext';

function Header() {
  const {userInfo,setUserInfo} = useContext(UserContext);

  useEffect(()=>{
    axios.get('http://localhost:3000/profile',{withCredentials:true})
    .then(res=> console.log(res) )
    .catch(err=>{
      console.log(err)
    })
  },[])

  function logout(){
    axios.post('http://localhost:3000/logout',{withCredentials:true})
    .then(res=>
      {        
        console.log(res)
        setUserInfo({...userInfo,username:null})
    })
  }
  return (    
    <header className=' flex justify-between  items-center  mt-[10px]  mb-[50px]'>
    <a href="" className='font-bold'>My blog</a>
    <nav className=' flex justify-center items-center  gap-4 md:gap-14'>
          
        { !userInfo.username &&
          (
            <>
              <Link to="login">Login</Link>
              <Link to="Register">Register</Link>
            </>
        )
          }
          
          { userInfo.username &&
          (
            <>
              <Link to="/create" >New</Link>
              <Link onClick={()=>{logout()}}>Logout</Link>
            </>
        )
          }
    </nav>
  </header>

  )
}

export default Header