import {format} from 'date-fns'
import { Link } from 'react-router-dom'

function Post({id,title,summary,cover,createdAt,author}) {
  return (
    <div className="flex flex-col gap-3 mb-[40px] md:flex-row">
    <div className='md:w-[43%]'>
      <Link to={`/post/${id}`}>
      <img src={`http://localhost:3000/` + `${cover}`} alt="Devin" className=' max-w-[100%]'/>
      </Link>
    </div>

    <div  className='flex flex-col space-y-[5px] md:w-[57%] leading-[19px]'>
      <Link to={`/post/${id}`}>
           <h1 className='font-bold text-[18px]'>{title}</h1>
      </Link>
        <p>
        <span className='text-[12px] font-bold mr-[5px] text-black'>{author.username}</span>
        <span className=' text-gray-600'>{format(new Date(createdAt),'MMM d, yyyy HH-mm')}</span>
        </p>
        <p>{summary}</p>
    </div>     
  </div>

  )
}

export default Post