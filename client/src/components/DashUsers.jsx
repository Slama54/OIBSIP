import { Button, Modal, Table, TableHead, TableHeadCell } from 'flowbite-react'
import{HiOutlineExclamationCircle} from 'react-icons/hi'
import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

export default function DashUsers() {

  const {currentUser}= useSelector((state)=> state.user)
  const[users, setUsers]= useState([])
  const [showMore, SetShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [userIdToDelete, setUserIdToDelete] = useState('')



useEffect(()=>{
  const fetchUsers = async()=>{
    try {
      const res = await fetch(`/api/user/getUsers?userId=${currentUser._id}`)
      const data = await res.json()
      if(res.ok){
        setUsers(data.users)
        if(data.users.length <6){
          SetShowMore(false)}
  
      }
    } catch (error) {
      console.log(error.message);
      
    }
    
   
  }
  if (currentUser.isAdmin) {
    fetchUsers();
  }
},[currentUser._id])
const handleShowMore = async ()=>{
  const startIndex = users.length 
  try {
    const res = await fetch(`/api/user/getusers?userId=${currentUser._id}&startIndex=${startIndex}`)
    const data = await res.json()
    if(res.ok){
      setUsers([...users,...data.users])
      if(data.users.length <6){
        SetShowMore(false)}
      
    }
    
  } catch (error) {
    console.log(error);
    
  }
}
const handleDeleteUser = async()=>{
  setShowModal(false);
  try {
    const res = await fetch(
      `/api/user/delete/${userIdToDelete}`,
      {
        method: 'DELETE'
      }
    )
    const data = await res.json()
    if(!res.ok){
      console.log(data.message)
    }
    else{
      setUsers(users.filter((user)=> user._id!== userIdToDelete))
    }
  } catch (error) {
    console.log(error);
    
  }
}
    
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && users.length > 0 ?(
        <>
        <Table hoverable className='shadow-md'>
          <TableHead>
            <TableHeadCell>Date created</TableHeadCell>
            <TableHeadCell>User image</TableHeadCell>
            <TableHeadCell>User name</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Address</TableHeadCell>
            <TableHeadCell>Phone</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Admin </TableHeadCell>
            
            <TableHeadCell>Delete</TableHeadCell>
           
          </TableHead>
          {users.map((user) => (
            <Table.Body className='divide-y'key={user._id}>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/user/${user.slug}`}>
                  <img
                      src={user.profilePicture}
                      alt={user.username}
                      className='w-10 h-10 object-cover bg-gray-500
                      rounded-full'
                    />
                  </Link>
                 
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/user/${user.slug}`} className='font-medium text-gray-900 dark:text-white'>
                  {user.username}
                  </Link>
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.address}</Table.Cell>
                  <Table.Cell>{user.phone}</Table.Cell>
                  <Table.Cell>{user.status}</Table.Cell>
                  <Table.Cell>{user.isAdmin? <span className='font-medium text-green-500'>Yes </span>: <span className='font-medium text-red-500'>No </span>}</Table.Cell>

                  <Table.Cell >
                    <span className='font-medium hover:underline text-red-500 cursor-pointer' onClick={()=>{
                      setShowModal(true)
                      setUserIdToDelete(user._id)

                    }} >Delete</span>
                  </Table.Cell>
                  

                  
                 
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
        {showMore &&(
          <Button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>Show more</Button>
        )}
        </>
      ):(<p>You have no user yet! </p>)}
      <Modal show={showModal} onClick={()=>setShowModal(false)} popup size={'md'}>
        <Modal.Header/>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle 
            className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
            <h3 className='text-lg text-gray-500 dark:text-gray-400 mb-5'>
              Are you sure you want to delete this user ?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color={'failure'} onClick={handleDeleteUser}>Yes, I'm sure</Button>
                <Button color={'gray'} onClick={()=>setShowModal(false)}>No, Cancel</Button>
              </div>
          </div>
        </Modal.Body>

      </Modal>
    </div>
  )
}
