import { Carousel } from 'flowbite-react'


export default function Home() {
  return (
    <div>
      
      <div className=" h-screen sm:h-screen xl:h-screen 2xl:h-screen">
      <Carousel > 
        <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
          Slide 1
        </div>
        <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
          Slide 2
        </div>
        <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
          Slide 3
        </div>
      </Carousel>
    </div>

    </div>
  )
}
