import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

export default function PizzaCard({pizza}) {
  return (
    
    
    <Card
    className="group relative w-full max-w-xs rounded-lg sm:w-[430px] transition-all"
   
  >
     <Link to={`/pizza/${pizza.slug}`}>
    <img src={pizza.image} className="h-[320px]  w-full object-cover" alt="" />
   
      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mt-4">
        {pizza.title}
      </h5>
    </Link>
    <div className="truncate  " dangerouslySetInnerHTML={{__html: pizza && pizza.content}}></div>
    
    <div className="flex items-center justify-between">
      <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">{pizza.priceS} dt</span>
      <Link to ={`/pizza/${pizza.slug}`}
        
        className="rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-cyan-800"
      >
        order now
      </Link>
    </div>
  </Card>

  
        
  )
}
