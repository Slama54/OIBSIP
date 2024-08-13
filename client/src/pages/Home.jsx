import { Carousel } from 'flowbite-react'
import Abouth from '../homeComponents/Abouth'
import Headerh from '../homeComponents/Headerh'
import Shop from '../homeComponents/Shop'
import Menu from '../homeComponents/Menu'
import Clinetsh from '../homeComponents/Clinetsh'
import Prices from '../homeComponents/Prices'


export default function Home() {
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
    <Prices/>

    </div>
  )
}
