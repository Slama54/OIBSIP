
import { Link } from "react-router-dom";

export default function PizzaCard({pizza}) {
  return (
    
    
    <div key={pizza._id} className="w-full lg:w-1/3 px-4 py-6">
       <Link to={`/pizza/${pizza.slug}`}>
    <div className="text-center">
      <div className="mb-6">
        <img src={pizza.image} alt={pizza.title} className="w-64 mx-auto" />
      </div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4 dark:text-gray-200">{pizza.title}</h1>
      <div className="text-lg text-gray-600 dark:text-gray-400 mb-8 overflow-hidden" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, lineClamp: 2, maxHeight: '4rem' }} dangerouslySetInnerHTML={{ __html: pizza && pizza.content }}></div>

      <p className="text-2xl font-bold dark:text-gray-300 text-gray-800">{pizza.priceM}.000 DT</p>
     
    </div>
    </Link>
   
  </div>
  
        
  )
}
