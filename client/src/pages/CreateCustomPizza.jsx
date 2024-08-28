
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

import { useEffect, useState } from 'react';

export default function CreateCustomPizza() {
    const [bases, setBases] = useState([]);
    const [base, setBase] = useState([]);
    const [sauces, setSauces] = useState([]);
    const [sauce, setSauce] = useState([]);
    const [cheeses, setCheeses] = useState([]);
    const [cheese, setCheese] = useState([]);
    const [meats, setMeats] = useState([]);
    const [meat, setMeat] = useState([]);
    const [vegetables, setVegetables] = useState([]);
    const [vegetable, setVegetable] = useState([]);


    useEffect(() => {
        const fetchBase = async () => {
        const res = await fetch('/api/base/getbases?limit=5');
        const data = await res.json();
        setBases(data.Bases);
        };
        fetchBase();
    }, []);


    useEffect(() => {
        const fetchCheese = async () => {
        const res = await fetch('/api/cheese/getcheeses?limit=5');
        const data = await res.json();
        setCheeses(data.Cheeses);
        };
        fetchCheese();
    }, []);

    useEffect(() => {
        const fetchMeat = async () => {
        const res = await fetch('/api/meat/getmeats?limit=5');
        const data = await res.json();
        setMeats(data.Meats);
        };
        fetchMeat();
    }, []);


    useEffect(() => {
        const fetchSauce = async () => {
        const res = await fetch('/api/sauce/getsauces?limit=5');
        const data = await res.json();
        setSauces(data.Sauces);
        };
        fetchSauce();
    }, []);

    useEffect(() => {
        const fetchVegetable = async () => {
        const res = await fetch('/api/vegetable/getvegetables?limit=5');
        const data = await res.json();
        setVegetables(data.Vegetables);
        };
        fetchVegetable();
    }, []);
  
  
  return (
    <div className="">
        <h2  className='text-center text-2xl font-bold my-3'>Pizza  Base</h2>
  <div className=" mx-6 my-6 flex justify-center gap-4">
        
        {bases.map((base) =>(
            
            <Card key={bases._id} sx={{ width: 180 }}  className="bg-gray-500">
            <div >
              <Typography level="title-lg">{base.name}</Typography>
             
              
            </div>
            <AspectRatio minHeight="130px" maxHeight="160px">
              <img
                src={base.photo}
                
                loading="lazy"
                alt="base image loading"
              />
            </AspectRatio>
            <CardContent orientation="horizontal">
              <div>
                <Typography level="body-xs">Base price:</Typography>
                <Typography sx={{ fontSize: 'lg', fontWeight: 'lg' }}>{base.price} dt</Typography>
              </div>
              <Button
                variant="solid"
                size="md"
                color="primary"
                aria-label="Explore Bahamas Islands"
                sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                onClick={()=>setBase(base._id)}
              >
                Add
              </Button>
            </CardContent>
          </Card>
        

        ))}
        
    </div>
    <h2 className='text-center text-2xl font-bold my-3'>Pizza  Sauce</h2>
  <div className=" mx-6 my-6 flex justify-center gap-4">
        
  {sauces.map((sauce) =>(
            
            <Card key={sauces._id} sx={{ width: 180 }}  className="bg-gray-500">
            <div >
              <Typography level="title-lg">{sauce.name}</Typography>
             
              
            </div>
            <AspectRatio minHeight="130px" maxHeight="160px">
              <img
                src={sauce.photo}
                
                loading="lazy"
                alt="base image loading"
              />
            </AspectRatio>
            <CardContent orientation="horizontal">
              <div>
                <Typography level="body-xs">Sauce price:</Typography>
                <Typography sx={{ fontSize: 'lg', fontWeight: 'lg' }}>{sauce.price} dt</Typography>
              </div>
              <Button
                variant="solid"
                size="md"
                color="primary"
                aria-label="Explore Bahamas Islands"
                sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                onClick={()=>setSauce(sauce._id)}
              >
                Add
              </Button>
            </CardContent>
          </Card>
        

        ))} 
        
    </div>

    <h2 className='text-center text-2xl font-bold my-3'>Pizza  Cheese</h2>
  <div className=" mx-6 my-6 flex justify-center gap-4">
        
  {cheeses.map((cheese) =>(
            
            <Card key={cheeses._id} sx={{ width: 180 }}  className="bg-gray-500">
            <div >
              <Typography level="title-lg">{cheese.name}</Typography>
             
              
            </div>
            <AspectRatio minHeight="130px" maxHeight="160px">
              <img
                src={cheese.photo}
                
                loading="lazy"
                alt="base image loading"
              />
            </AspectRatio>
            <CardContent orientation="horizontal">
              <div>
                <Typography level="body-xs">Cheese price:</Typography>
                <Typography sx={{ fontSize: 'lg', fontWeight: 'lg' }}>{cheese.price} dt</Typography>
              </div>
              <Button
                variant="solid"
                size="md"
                color="primary"
                aria-label="Explore Bahamas Islands"
                sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                onClick={()=>setCheese(cheese._id)}
              >
                Add
              </Button>
            </CardContent>
          </Card>
        

        ))} 
        
    </div>
    <h2 className='text-center text-2xl font-bold my-3'>Pizza  Meat</h2>
  <div className=" mx-6 my-6 flex justify-center gap-4">
        
  {meats.map((meat) =>(
            
            <Card key={meats._id} sx={{ width: 180 }}  className="bg-gray-500">
            <div >
              <Typography level="title-lg">{meat.name}</Typography>
             
              
            </div>
            <AspectRatio minHeight="130px" maxHeight="160px">
              <img
                src={meat.photo}
                
                loading="lazy"
                alt="base image loading"
              />
            </AspectRatio>
            <CardContent orientation="horizontal">
              <div>
                <Typography level="body-xs">Meat price:</Typography>
                <Typography sx={{ fontSize: 'lg', fontWeight: 'lg' }}>{meat.price} dt</Typography>
              </div>
              <Button
                variant="solid"
                size="md"
                color="primary"
                aria-label="Explore Bahamas Islands"
                sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                onClick={()=>setMeat(meat._id)}
              >
                Add
              </Button>
            </CardContent>
          </Card>
        

        ))} 
        
    </div>
    <h2 className='text-center text-2xl font-bold my-3'>Pizza  Vegetable</h2>
  <div className=" mx-6 my-6 flex justify-center gap-4">
        
  {vegetables.map((vegetable) =>(
            
            <Card key={vegetables._id} sx={{ width: 180 }}  className="bg-gray-500">
            <div >
              <Typography level="title-lg">{vegetable.name}</Typography>
             
              
            </div>
            <AspectRatio minHeight="130px" maxHeight="160px">
              <img
                src={vegetable.photo}
                
                loading="lazy"
                alt="base image loading"
              />
            </AspectRatio>
            <CardContent orientation="horizontal">
              <div>
                <Typography level="body-xs">Vegetable price:</Typography>
                <Typography sx={{ fontSize: 'lg', fontWeight: 'lg' }}>{vegetable.price} dt</Typography>
              </div>
              <Button
                variant="solid"
                size="md"
                color="primary"
                aria-label="Explore Bahamas Islands"
                sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                onClick={()=>setVegetable(vegetable._id)}
              >
                Add
              </Button>
            </CardContent>
          </Card>
        

        ))} 
        
    </div>
    </div>
 
  )
}
