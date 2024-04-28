import React, { useEffect, useState } from 'react'
import Post from './Post'
import axios from 'axios'

function Indexpage() {
  const [posts,setPosts] = useState([]);

  useEffect(()=>{
     axios.get('http://localhost:3000/post')
     .then(res=>{
      console.log(res.data)
      setPosts(res.data)})
     .catch(err=>console.log(err))
     },[])
     
  return (
    <div>    
         {posts.length>0 && posts.map(post=>(
          <Post 
          id={post._id}
          title={post.title} 
          summary={post.summary} 
          content={post.content}
          cover={post.cover} 
          createdAt={post.createdAt}
          author={post.author}/>
         ))}
 
    </div>
  )
}

export default Indexpage