
import Header from '../components/Header'

export default function Headerh() {
  return (
    <div className="relative w-full  h-screen bg-cover bg-no-repeat" style={{ backgroundImage: "url('/bg.jpg')" }}>
  
    <div className="flex  items-center  h-full text-white">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="max-w-md">
          <h3 className="text-2xl font-semibold">Pizza Delivery</h3>
          <h1 className="text-6xl lg:text-7xl font-extrabold mt-4">Lazy Baker Pizza Maker</h1>
          <p className="text-lg font-light mt-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            minus ut mollitia error molestiae quia.
          </p>
          <div className="mt-8">
            <a href="#" className="inline-block bg-red-500 text-white font-bold py-4 px-8 rounded-full text-xs hover:bg-red-600 transition duration-300">
              DELIVERY NOW
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
