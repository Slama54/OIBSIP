import { Carousel } from 'flowbite-react'
import Abouth from '../homeComponents/Abouth'
import Headerh from '../homeComponents/Headerh'
import Shop from '../homeComponents/Shop'
import Menu from '../homeComponents/Menu'
import Clinetsh from '../homeComponents/Clinetsh'
import Prices from '../homeComponents/Prices'
import { useEffect, useState } from 'react'
import PizzaCard from '../components/PizzaCard'


export default function Home() {
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  const [recentPizza, setRecentPizza] = useState(null);
  useEffect(() => {
    const fetchRecentPizza = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/pizza/getpizzas?limit=6`);
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
  return (
    <div>
      
      <div className=" h-screen sm:h-screen xl:h-screen 2xl:h-screen">
      <Carousel > 
        <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
        <Headerh/>
        </div>
       
      </Carousel>
      
    </div>
   
    <Abouth/>
    <Shop/>
    <Menu/>
    <Clinetsh/>
    <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-2xl mt-5 font-bold">Our Pizza 🍕</h1>
        <div className="flex flex-wrap  mt-5 justify-center">
          {recentPizza && recentPizza.map((pizza) => <PizzaCard key={pizza._id} pizza={pizza} />)}
        </div>
      </div>

    </div>
  )
}
