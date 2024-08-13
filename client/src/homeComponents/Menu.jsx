
export default function Menu() {
  return (
    <div className="py-20">
    <div className="max-w-screen-xl mx-auto">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2">
          <div className="overflow-hidden">
            <img src="/pizza.jpg" alt="Pizza" className="w-full" />
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-12">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">The Pizza Menu</h3>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">CHICAGO THIN CRUST</h1>
          <p className="text-lg text-gray-600 mb-8">
            Investigationes demonstraverunt lectores legere me lius quod ii
            legunt saepius. Claritas est etiam processus dynaus, quise
            sequitur mutationem consuetudium lectorum.
          </p>
          <div>
            <a
              href="#"
              className="inline-block bg-red-500 text-white font-bold py-3 px-8 rounded-full text-xs hover:bg-red-600 transition duration-300"
            >
              VIEW MORE
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
