
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Alert, Carousel, HR, TextInput } from 'flowbite-react';


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
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError]= useState(null)


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


    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
          const res = await fetch('/api/custompizza/createcustompizza', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          if (!res.ok) {
            setPublishError('Failed to create the pizza');
            return;
          }
          if (res.ok) {
            setPublishError(null);
            navigate(`/pizza/${data.slug}`);
            return;
          }
          
          
        } catch (error) {
          setPublishError('Failed to create the pizza');
          
        }
    
      }
      console.log(formData);
      
  
  
  return (
    <div className="">
        <h1 className='text-center text-4xl font-bold my-3'>Create your custom Pizza </h1>
        <HR className='border-1' />


        
        <form className='justify-center' onSubmit={handleSubmit}>
        <h2  className='text-center text-2xl font-bold my-3'>Pizza  Base</h2>
  <div className="  flex-wrap mx-6 my-6 flex justify-center gap-4">
        
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
               
                onClick={() =>
                    setFormData({...formData, base: base._id })
                  }
              >
                Add
              </Button>
            </CardContent>
          </Card>
        

        ))}
        
    </div>
    <HR/>
    <h2 className='text-center text-2xl font-bold my-3'>Pizza  Sauce</h2>
  <div className=" mx-6 my-6 flex-wrap flex justify-center gap-4">
        
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
                onClick={() =>
                    setFormData({...formData, sauce: sauce._id })
                  }
              >
                Add
              </Button>
            </CardContent>
          </Card>
        

        ))} 
        
    </div>
    <HR/>
    <h2 className='text-center text-2xl font-bold my-3'>Pizza  Cheese</h2>
  <div className=" mx-6 my-6 flex-wrap flex justify-center gap-4">
        
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
                onClick={() =>
                    setFormData({...formData, cheese: cheese._id })
                  }
              >
                Add
              </Button>
            </CardContent>
          </Card>
        

        ))} 
        
    </div>
    <HR/>
    <h2 className='text-center text-2xl font-bold my-3'>Pizza  Meat</h2>
  <div className=" mx-6 my-6 flex-wrap flex justify-center gap-4">
        
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
                onClick={() =>
                    setFormData({...formData, meats: meat._id })
                  }
              >
                Add
              </Button>
            </CardContent>
          </Card>
        

        ))} 
        
    </div>
    <HR/>
    <h2 className='text-center text-2xl font-bold my-3'>Pizza  Vegetable</h2>
  <div className=" mx-6 my-6 flex-wrap flex justify-center gap-4">
        
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
                onClick={() =>
                    setFormData({...formData, vegetables: vegetable._id })
                  }
              >
                Add
              </Button>
            </CardContent>
          </Card>
        

        ))} 
       
        
    </div>
    <HR/>
    <div className='flex items-center justify-center'>
    <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='justify-center self-center w-60'
            onChange={(e)=>setFormData({...formData, title: e.target.value})}
          />
        
            <div className="mx-4 mb-3 my-1 ">
            <button className=" mx-auto relative  self-center inline-flex items-center justify-center p-0.5  me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
Pink to orange
</span>
</button>
            </div>

          </div>
    </form>
    {publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>}

    </div>
 
  )
}
