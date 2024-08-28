import { Button, Modal, Table, TableHead, TableHeadCell } from 'flowbite-react'
import{HiOutlineExclamationCircle} from 'react-icons/hi'
import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

export default function DashPizza() {

  const {currentUser}= useSelector((state)=> state.user)
  const[userPizzas, setUserPizzas]= useState([])
  const [showMore, SetShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [pizzaIdToDelete, setPizzaIdToDelete] = useState('')



useEffect(()=>{
  const fetchPizzas = async()=>{
    try {
      const res = await fetch(`/api/pizza/getpizzas`)
      const data = await res.json()
      if(res.ok){
        setUserPizzas(data.pizzas)
        if(data.pizzas.length <6){
          SetShowMore(false)}
  
      }
    } catch (error) {
      console.log(error.message);
      
    }
    
   
  }
  if (currentUser.isAdmin) {
    fetchPizzas();
  }
},[currentUser._id])
const handleShowMore = async ()=>{
  const startIndex = userPizzas.length 
  try {
    const res = await fetch(`/api/pizza/getpizzas?startIndex=${startIndex}`)
    const data = await res.json()
    if(res.ok){
      setUserPizzas([...userPizzas,...data.pizzas])
      if(data.pizzas.length <6){
        SetShowMore(false)}
      
    }
    
  } catch (error) {
    console.log(error);
    
  }
}
const handleDeletePizza = async()=>{
  setShowModal(false);
  try {
    const res = await fetch(
      `/api/pizza/deletepizza/${pizzaIdToDelete}/${currentUser._id}`,
      {
        method: 'DELETE'
      }
    )
    const data = await res.json()
    if(!res.ok){
      console.log(data.message)
    }
    else{
      setUserPizzas(userPizzas.filter((pizza)=> pizza._id!== pizzaIdToDelete))
    }
  } catch (error) {
    console.log(error.message);
    
  }
}
    
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userPizzas.length > 0 ?(
        <>
        <Table hoverable className='shadow-md'>
          <TableHead>
            <TableHeadCell>Date updated</TableHeadCell>
            <TableHeadCell>Pizza image</TableHeadCell>
            <TableHeadCell>Pizza Title</TableHeadCell>
            <TableHeadCell>Price S</TableHeadCell>
            <TableHeadCell>Price M</TableHeadCell>
            <TableHeadCell>Price L</TableHeadCell>
            <TableHeadCell>Delete</TableHeadCell>
            <TableHeadCell><span>Edit</span></TableHeadCell>
          </TableHead>
          {userPizzas.map((pizza) => (
            <Table.Body className='divide-y'key={pizza._id}>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>
                  {new Date(pizza.updatedAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/pizza/${pizza.slug}`}>
                  <img src={pizza.image} alt={pizza.title} className='h-10 w-20 object-cover bg-gray-500' />
                  </Link>
                 
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/pizza/${pizza.slug}`} className='font-medium text-gray-900 dark:text-white'>
                  {pizza.title}
                  </Link>
                  </Table.Cell>
                  <Table.Cell>{pizza.priceS}</Table.Cell>
                  <Table.Cell>{pizza.priceM}</Table.Cell>
                  <Table.Cell>{pizza.priceL}</Table.Cell>
                  <Table.Cell >
                    <span className='font-medium hover:underline text-red-500 cursor-pointer' onClick={()=>{
                      setShowModal(true)
                      setPizzaIdToDelete(pizza._id)

                    }} >Delete</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className='font-medium hover:underline text-teal-500 cursor-pointer' to={`/update-pizza/${pizza._id}`}>
                    <span>Edit</span>
                    </Link>
                  </Table.Cell>

                  
                 
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
        {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
        </>
      ):(<p>You have no pizza yet! </p>)}
      <Modal show={showModal} onClick={()=>setShowModal(false)} popup size={'md'}>
        <Modal.Header/>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle 
            className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
            <h3 className='text-lg text-gray-500 dark:text-gray-400 mb-5'>
              Are you sure you want to delete this pizza ?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color={'failure'} onClick={handleDeletePizza}>Yes, I'm sure</Button>
                <Button color={'gray'} onClick={()=>setShowModal(false)}>No, Cancel</Button>
              </div>
          </div>
        </Modal.Body>

      </Modal>
    </div>
  )
}
