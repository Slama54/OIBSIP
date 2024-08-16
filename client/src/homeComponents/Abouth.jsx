

export default function Abouth() {
  return (
    <div className="py-20">
    <div className="max-w-screen-xl mx-auto">
      <div className="flex flex-wrap ">
        <div className="w-full lg:w-1/2 p-12 ">
          <h3 className="text-gray-700 text-2xl font-bold mb-3 dark:text-yellow-50">About Us</h3>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5 dark:text-yellow-50">
            WELCOME TO PIZZA SHOP
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300  mb-8">
            Investigationes demonstraverunt lectores legere me lius quod ii
            legunt saepius. Claritas est etiam processus dynaus, quise
            sequitur mutationem consuetudium lectorum.
          </p>
          <div>
            <a
              href="#"
              className="inline-block bg-red-500 text-white font-bold py-3 px-8 rounded-full text-xs hover:bg-red-600 transition duration-300"
            >
              READ MORE
            </a>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="overflow-hidden">
            <img src="/pizza.jpg" alt="Pizza" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
