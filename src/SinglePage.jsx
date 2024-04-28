import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {formatISO9075} from 'date-fns';
import { UserContext } from './UserContext';

function SinglePage()  {
    const [postinfo,setInfo] = useState(null)
    const {userInfo,setUserInfo} = useContext(UserContext);
    const {id} = useParams();
    useEffect(()=>{
        axios.get(`http://localhost:3000/post/${id}`)
        .then(res=>{
            setInfo(res.data)
            console.log(res.data)
        })
        .catch(err=>console.log(err))
    },[])

    if(!postinfo) return '';

    return (
      <div className='flex flex-col md:mx-[10%] justify-center'>
            <div className='text-3xl font-bold mb-2 text-center'>
                {postinfo.title}
            </div>

            <div className='text-center'>
                <time>
                {formatISO9075(new Date(postinfo.createdAt))}
                </time>

                <span className=' font-bold text-gray-600'>{` by ${postinfo.author.username}`}</span>
            </div>
           <div className='mb-[20px]'>
            <Link to={`/edit/${postinfo._id}`} className='p-2 mb-[20px] rounded-sm border-solid border-2 border-gray-700'>Edit Post</Link>
           </div>
            <div className=''>
            <img src={`http://localhost:3000/` + `${postinfo.cover}`} alt="post" className='w-[100%] md:h-[500px]'/>
            </div>

            <div className='text-[1xl] md:text-2xl break-words mt-4' dangerouslySetInnerHTML={{__html:postinfo.content}}>   
            </div>

      </div>
    )
  }


export default SinglePage