import { Button, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link,useNavigate  } from 'react-router-dom';
import { RiCloseLargeLine } from "react-icons/ri";

export default function CartPage() {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pizzaData, setPizzaData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data); // Set user data after it's fetched
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      }
    };
    getUser();
  }, [currentUser._id]);

  useEffect(() => {
    const fetchPizzaData = async () => {
      if (!user.cartData || Object.keys(user.cartData).length === 0) {
        setLoading(false);
        return; // No cart data, stop here
      }

      try {
        const pizzaIds = Object.keys(user.cartData);
        const pizzas = [];
        let calculatedTotalPrice = 0;

        for (const id of pizzaIds) {
          const res = await fetch(`/api/pizza/getpizzas?pizzaId=${id}`);
          const data = await res.json();
          if (res.ok) {
            const pizza = data.pizzas[0];
            pizzas.push(pizza);

            // Calculate total price: quantity * price
            const quantity = user.cartData[pizza._id];
            const pizzaPrice = pizza.priceS; // Assuming you're using small size price
            calculatedTotalPrice += quantity * pizzaPrice;
          }
        }

        setPizzaData(pizzas);
        setTotalPrice(calculatedTotalPrice); // Set total price state
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    
  

    if (user.cartData) {
      fetchPizzaData();
    }
  }, [user.cartData]);
  const handleOrder = () => {
    // Navigate to order page with the total price
    navigate('/order', { state: { totalPrice } });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !pizzaData.length) {
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
          <Table.HeadCell />
        </Table.Head>
        <Table.Body className="divide-y">
          {pizzaData.map((pizza) => (
            <Table.Row key={pizza._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {pizza.title}
              </Table.Cell>
              <Table.Cell>
                <Link to={`/pizza/${pizza.slug}`}>
                  <img src={pizza.image} alt={pizza.title} className="h-16 w-16 object-cover bg-gray-500" />
                </Link>
              </Table.Cell>
              <Table.Cell>{user.cartData[pizza._id]}</Table.Cell>
              <Table.Cell>{pizza.priceS} dt</Table.Cell>
              <Table.Cell>
                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                  <RiCloseLargeLine className="text-xl" />
                </a>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* Display total price */}
      <div className="mt-4 grid justify-end mx-4">
        <Button 
         onClick={handleOrder}
        color={"red-500"} className="mt-4 inline-block bg-red-500    text-white font-bold  rounded-full text-sm hover:bg-red-600 transition duration-300"
        >
          Total Price: {totalPrice} dt
        </Button>
      </div>
    </div>
  );
}
