import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { RiCloseLargeLine } from "react-icons/ri";

export default function CartPage() {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pizzaData, setPizzaData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
 

  useEffect(() => {
    const fetchPizzaData = async () => {
      try {
        const pizzaIds = Object.keys(currentUser.cartData);
        const pizzas = [];

        for (const id of pizzaIds) {
          const res = await fetch(`/api/pizza/getpizzas?pizzaId=${id}`);
          const data = await res.json();
          if (res.ok) {
            pizzas.push(data.pizzas[0]);
            
          }
        }

        setPizzaData(pizzas);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchPizzaData();
  }, [currentUser.cartData]);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading cart items.</div>;
  }

  return (
    <div className="overflow-x-auto min-h-screen my-6 mx-7">
      <Table hoverable striped>
        <Table.Head>
          <Table.HeadCell>Product Name</Table.HeadCell>
          <Table.HeadCell>Product Image</Table.HeadCell>
          <Table.HeadCell>Quantity</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell/>
           
        </Table.Head>
        <Table.Body className="divide-y">
        {pizzaData.map((pizza) => (
            <Table.Row key={pizza._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {pizza.title}
              </Table.Cell>
              <Table.Cell>
                  <Link to={`/pizza/${pizza.slug}`}>
                  <img src={pizza.image} alt={pizza.title} className='h-16 w-16 object-cover bg-gray-500' />
                  </Link>
                 
                </Table.Cell>
              <Table.Cell>{currentUser.cartData[pizza._id]}</Table.Cell>
              <Table.Cell>{pizza.priceS} dt</Table.Cell> {/* Replace with correct size pricing */}
              <Table.Cell>
                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                <RiCloseLargeLine  className="text-xl"/>
                </a>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
