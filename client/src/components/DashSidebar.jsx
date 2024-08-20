import {Sidebar} from 'flowbite-react'
import { useEffect, useState } from 'react'
import {HiUser, HiArrowSmRight, HiOutlineUserGroup} from 'react-icons/hi'
import { PiPizzaFill } from "react-icons/pi";

import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
import { signoutSuccess } from '../redux/user/userSlice';
export default function DashSidebar() {
  const dispatch = useDispatch();
    const location = useLocation()
    const [tab, setTab]=useState('')
    const { currentUser } = useSelector((state) => state.user);
    useEffect(()=>{
      const urlParams = new URLSearchParams(location.search);
      const tabFormUrl = urlParams.get('tab');
      if (tabFormUrl) {
        setTab(tabFormUrl)
      }
      
    }, [location.search])

    const handleSignout = async()=>{
      try {
        const res = await fetch('api/user/signout',{
          method: 'Post'
        })
        const data = await res.json();
        if(!res.ok){
          console.log(data.message)
        }
        else{
          dispatch(signoutSuccess())
        }
  
      } catch (error) {
        console.log(error.message);
        
      }
    }
  
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
                <Link to={'/dashboard?tab=profile'}>
                    <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin':'User'} labelColor='dark' as='div'>
                        Profile
                    </Sidebar.Item>
                </Link>
                {currentUser.isAdmin &&(<Link to={'/dashboard?tab=pizza'}>
                    <Sidebar.Item active={tab === 'pizza'} icon={PiPizzaFill  }  as='div'>
                        Pizza
                    </Sidebar.Item>
                </Link>
                
            )}
            {currentUser.isAdmin &&(<Link to={'/dashboard?tab=user'}>
                    <Sidebar.Item active={tab === 'user'} icon={HiOutlineUserGroup  }  as='div'>
                        Users
                    </Sidebar.Item>
                </Link>
                
            )}
               
            
                <Sidebar.Item onClick={handleSignout} icon={HiArrowSmRight} className='cursor-pointer' >SignOut</Sidebar.Item>

            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
