
export default function Prices() {
  return (
    <div className="py-20">
    <div className="max-w-screen-xl mx-auto">
      <div className="flex flex-wrap">
        {[
          { id: 1, img: "/pizza1.png", title: "Fully veg loaded pizza", price: "32.000dt" },
          { id: 2, img: "/pizza2.png", title: "Pizza Margherita", price: "30.000dt" },
          { id: 3, img: "/pizza3.png", title: "Onion Pizza", price: "15.000dt" },
          { id: 4, img: "/pizza4.png", title: "Pizza Margherita", price: "28.000dt" },
          { id: 5, img: "/pizza5.png", title: "Cheese Pizza", price: "25.000dt" },
          { id: 6, img: "/pizza6.png", title: "Veg Pizza", price: "22.000dt" },
        ].map((pizza) => (
          <div key={pizza.id} className="w-full lg:w-1/3 px-4 py-6">
            <div className="text-center">
              <div className="mb-6">
                <img src={pizza.img} alt={pizza.title} className="w-64 mx-auto" />
              </div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-4">{pizza.title}</h1>
              <p className="text-gray-600 text-lg mb-4">
                Nullam nibh sem, imperdiet ultrices commodo a, vulputate vel
                ligula. Duis venenatis at eros sed egestas. Mauris rutrum quam
                risus, vel hendrerit dui tempor in.
              </p>
              <p className="text-2xl font-bold text-gray-800">{pizza.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}
