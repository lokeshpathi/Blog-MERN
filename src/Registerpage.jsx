import React from 'react'
import axios from 'axios'
function Registerpage() {
    const [username,setUserName] = React.useState('')
    const [password,setPassword] = React.useState('')
    const inputStyle = `p-2 mb-[20px] rounded-sm border-solid border-2 border-gray-700 w-[80%] md:w-[60%]`

    function register(e){
      e.preventDefault()
       axios.post('http://localhost:3000/register',{username,password})
       .then(res=>
           alert('Registeration successful....!')
      )
       .catch(err=>
        {console.log(err)
          alert('Registeration failed Try again later....!')
      })
    }
    return (
    
          <form action="" className='flex flex-col items-center' onSubmit={(e)=>register(e)}>
              <h1 className='text-2xl font-bold mb-[35px]'>Register</h1>
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

              <button className={inputStyle+` bg-gray-700 + text-white`}>Register</button>
          </form>
  )
}

export default Registerpage