import { Alert, Button, Textarea } from 'flowbite-react'
import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import Comment from './Comment'
export default function CommentSection({pizzaId}) {
    const {currentUser} = useSelector(state => state.user)
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(comment.length > 200) {
            return
       
    }
    try {
        const  res = await fetch('/api/comment/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content : comment,
                pizzaId,userId : currentUser._id,
            }),
        })
        const data = await res.json()
        if(!res.ok) {
            setCommentError('Failed to create comment')
            return
        }
        if(res.ok){
            setComment('');
            setCommentError(null);
            setComments([...comments,data])
        }
    } catch (error) {
        setCommentError(error.message)
       
        
    }
    
}
useEffect(()=>{
  const getComments = async()=>{
    try {
      const res = await fetch (`/api/comment/getPizzaComments/${pizzaId}`)
      if(res.ok){
        const data = await res.json()
        setComments(data)
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  getComments()
},[pizzaId])


  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
        {currentUser ?(
            <div className="flex items-center gap-1 my-5 text-gray-500">
                <p>Signed in as : </p>
                <img src={currentUser.profilePicture} alt="" className='w-5 h-5  rounded-full object-cover'/>
                <Link to={'/dashboard?tab=profile'} className='text-xs hover:underline'>
                @{currentUser.username}
                </Link>
            </div>
        ):(<div className='text-sm text-teal-500 my-5 flex gap-1'>
            Please sign in to comment
            <Link className='text-blue-500 hover:underline' to='/sign-in'>Sign in</Link>
            
        </div>)}
        {currentUser && (
        <form
        onSubmit={handleSubmit}
          className='border border-teal-500 rounded-md p-3'
        >
          <Textarea
            placeholder='Add a comment...'
            rows='3'
            maxLength='200'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className='flex justify-between items-center mt-5'>
            <p className='text-gray-500 text-xs'>
              {200 - comment.length} characters remaining
            </p>
            <Button outline gradientDuoTone='purpleToBlue' type='submit'>
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color='failure' className='mt-5'>
              {commentError}
            </Alert>
          )}
        </form>

      )}
      {comments.length === 0 ? (
        <p className='text-gray-500 text-sm my-5'>No comments yet</p>
      ):(
      <>
      <div className='text-sm flex my-5 items-center gap-1'>
        <p>Comments</p>
      <div className="border border-gray-400 py-1 px-2 rounded-sm">
        <p>{comments.length}</p>
        </div>


      </div>
      {comments.map(comment => <Comment key={comment._id} comment={comment}/>)}
      </>
    )}
    </div>
  )
}
