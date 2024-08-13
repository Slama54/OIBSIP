
export default function Shop() {
  return (
    <div className="w-full h-96 bg-cover bg-fixed bg-no-repeat bg-center relative" style={{ backgroundImage: `url('/bg.jpg')` }}>
    <div className="max-w-screen-xl mx-auto h-full flex items-center justify-start">
      <div className="text-center text-white">
        <h1 className="text-xl w-5/6 md:text-2xl lg:text-4xl font-bold">Free Delivery With PIZZA OF THE DAY Only 8.99₹</h1>
        <div className="mt-8 flex items-center justify-center">
          <a href="#" className="inline-block  px-10 py-4 text-sm font-bold text-white bg-red-600 rounded-full hover:bg-red-700 transition duration-300">
            SHOP NOW
          </a>
        </div>
      </div>
    </div>
  </div>
  )
}
