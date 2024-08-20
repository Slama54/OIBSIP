import { Button, Table, TableHead, TableHeadCell } from 'flowbite-react'
import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

export default function DashPizza() {

  const {currentUser}= useSelector((state)=> state.user)
  const[userPizzas, setUserPizzas]= useState([])
  const [showMore, SetShowMore] = useState(true)
console.log(userPizzas);


useEffect(()=>{
  const fetchPizzas = async()=>{
    try {
      const res = await fetch(`/api/pizza/getpizzas?userId=${currentUser._id}`)
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
    const res = await fetch(`/api/pizza/getpizzas?userId=${currentUser._id}&startIndex=${startIndex}`)
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
                    <span className='font-medium hover:underline text-red-500 cursor-pointer' >Delete</span>
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
        {showMore &&(
          <Button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>Show more</Button>
        )}
        </>
      ):(<p>You have no pizza yet! </p>)}
    </div>
  )
}
