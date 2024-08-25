import { Label, Radio, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import CommentSection from "../components/CommentSection";
import PizzaCard from "../components/PizzaCard";
import { useSelector } from "react-redux";
import { BsCartDashFill,BsFillCartDashFill } from "react-icons/bs";
import { BsCartPlusFill } from "react-icons/bs";

export default function PizzaPage() {
  const { pizzaSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState(false);
  const [pizza, setPizza] = useState(null);
  const [recentPizza, setRecentPizza] = useState(null);
  const [selectedSize, setSelectedSize] = useState("S");
  const [cartItems, setCartItems] = useState({});
  console.log(pizza);

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/pizza/getpizzas?slug=${pizzaSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPizza(data.pizzas[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPizza();
  }, [pizzaSlug]);

  useEffect(() => {
    const fetchRecentPizza = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/pizza/getpizzas?limit=3`);
        const data = await res.json();

        if (res.ok) {
          setRecentPizza(data.pizzas);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchRecentPizza();
  }, []);

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      const userId = currentUser._id; // Assuming you have access to the current user
      const itemId = pizza._id; // Pizza ID
      const size = selectedSize; // The size selected by the user

      const res = await fetch(`/api/user/add/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId: itemId,
          size: size,
        }),
      });

      const data = await res.json();
      setCartItems(prevState => ({
        ...prevState,
        [itemId]: (prevState[itemId] || 0) + 1
      }));
     
      
      if (!res.ok) {
        // Handle the error
        console.error(data.message);
        
        
      } else {
        // Success, cart updated
        console.log("Cart updated", data);
        
      }
    } catch (error) {
      console.error('Error adding to cart', error.message);
    }
   

    
  };

  const handleRemoveFromCart = async (e) => {
    e.preventDefault();
    try {
      const userId = currentUser._id; // Assuming you have access to the current user
      const itemId = pizza._id; // Pizza ID
      const size = selectedSize; // The size selected by the user

      const res = await fetch(`/api/user/removefromcart/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId: itemId,
          size: size,
        }),
      });

      const data = await res.json();
      setCartItems(prevState => {
        const updatedItems = { ...prevState };
        if (updatedItems[itemId] > 1) {
          updatedItems[itemId] -= 1;
        } else {
          delete updatedItems[itemId];
        }
        return updatedItems;
      });
      if (!res.ok) {
        // Handle the error
        console.error(data.message);
      } else {
        // Success, cart updated
        console.log("Cart updated", data);
        
      }
    } catch (error) {
      console.error('Error adding to cart', error.message);
    }
  };


  if (loading) {
    return <div className="flex justify-center items-center min-h-screen"><Spinner className="4xl" /></div>;
  }

  return (
    <main className="py-20 p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/2">
            <div className="overflow-hidden flex-1">
              <img src={pizza.image} alt="Pizza" className="w-full" />
            </div>
          </div>
          <div className="w-full flex-1 lg:w-1/2 p-12">
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Pizza Artisan</h3>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-gray-200 mb-6">{pizza.title}</h1>
            <div className="text-lg text-gray-600 dark:text-gray-300 mb-8" dangerouslySetInnerHTML={{ __html: pizza && pizza.content }}></div>
            <fieldset className="flex max-w-md flex-col gap-4">
              <legend className="mb-4">Choose your favorite pizza size</legend>
              <div className="flex items-center gap-2">
                <Radio id="priceS" name="price" value="S" onChange={handleSizeChange} defaultChecked />
                <Label htmlFor="priceS">Small {pizza.priceS} dt</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio id="priceM" name="price" value="M" onChange={handleSizeChange} />
                <Label htmlFor="priceM">Medium {pizza.priceM} dt</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio id="priceL" name="price" value="L" onChange={handleSizeChange} />
                <Label htmlFor="priceL">Large {pizza.priceL} dt</Label>
              </div>
            </fieldset>
            {
  
  <div className="flex items-center gap-4 mt-5">
     {cartItems[pizza._id] ? (
              <div className="flex items-center gap-4">
                <BsFillCartDashFill
                  className="text-red-500 hover:text-red-700 cursor-pointer text-2xl"
                  onClick={handleRemoveFromCart}
                />
                <p className="text-xl font-bold">
                  {cartItems[pizza._id]} in cart
                </p>
                <BsCartPlusFill 
                  className="text-green-500 hover:text-green-700 cursor-pointer text-2xl"
                  onClick={handleAddToCart}
                />
              </div>
              
            ) : (
              <BsCartPlusFill 
                className="text-gray-500 hover:text-green-500 cursor-pointer text-2xl h-10 w-10"
                onClick={handleAddToCart}
              />
            )
            
            
            }
  </div>

}
            
            <Link to={'/cart/'}
              
              
              className="mt-4 inline-block bg-red-500 text-white font-bold py-3 px-8 rounded-full text-xs hover:bg-red-600 transition duration-300"
            >
              ORDER NOW
            </Link>
            
            
            

          </div>
        </div>
      </div>
      <CommentSection pizzaId={pizza._id} />
      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-2xl mt-5 font-bold">Our Pizza 🍕</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {recentPizza && recentPizza.map((pizza) => <PizzaCard key={pizza._id} pizza={pizza} />)}
        </div>
      </div>
    </main>
  );
}
