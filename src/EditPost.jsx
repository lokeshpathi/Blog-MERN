import React,{useEffect, useState} from "react"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Navigate, useParams } from 'react-router-dom'
import axios from "axios"

function EditPost() {
  const {id} = useParams();
  const [title,setTitle] = useState('')
  const [summary,setSummary] = useState('')
  const [content,setContent] = useState('')
  const [file,setFile] = useState('')
  const [redirect,setRedirect] = useState(false)

  useEffect(()=>{
    axios.get(`http://localhost:3000/post/${id}`)
    .then(res=>{
      setTitle(res.data.title)
      setSummary(res.data.summary)
      setContent(res.data.content)
      setFile(res.data.file)

    })
  },[])

  const inputStyle = `p-2 mb-[20px] rounded-sm border-solid border-2 border-gray-700 w-[80%] md:w-[60%]`
  const modules= {
    toolbar:[
      [{'header':[1,2,false]}],
      ['bold','italic','underline','strike','blockquote'],
      [{'list':'ordered'},{'list':'bullet'},{'indent':-1}]
      ['link','image'],
      [ 'clean']
    ]
  };

  const formats =[
    'header',
    'bold','italic','underline','strike','blockquote',
    'list','bullet','indent',
    'link','image'
  ]

 function editpost(e){
  const data = new FormData();
  data.set('title',title)
  data.set('summary',summary)
  data.set('content',content)
  data.set('id',id)
  if (file?.[0]){
    data.set('file',file?.[0])
  }
  
  e.preventDefault()
  axios.put('http://localhost:3000/post',data,{withCredentials:true})
  .then(res=>{
    setRedirect(true)
    console.log(res.data)
  }
  )
  .catch(err=>{console.log(err)})
 }


 if(redirect){
   return <Navigate to={'/post/'+id} />
 }

  return (
    <form className='flex flex-col items-center' onSubmit={(e)=>{editpost(e)}}>
        <input 
        type="title"
        placeholder='Title'
        className={inputStyle}
        value={title}
        onChange={(e)=>{setTitle(e.target.value)}}/>


        <input
        type="summary" 
        placeholder='Summary' 
        className={inputStyle}  
        value={summary}
        onChange={(e)=>{setSummary(e.target.value)}}/>


        <input 
        type="file" 
        name="Upload-image" 
        className={inputStyle}
        onChange={(e)=>{setFile(e.target.files)}}/>


        <ReactQuill 
        value={content}  
        className={inputStyle} 
        modules={modules} 
        formats={formats}  
        onChange={(value)=>{setContent(value)}}/>

        <button className={inputStyle+` bg-gray-700 + text-white`}>Update Post</button>
    </form>
  )

}



export default EditPost