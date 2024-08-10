import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
   
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row
      md:items-center gap-5">
        {/*left*/}
          <div className="flex-1">
          <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
           <img src="\logo\pizza-hut-logo-DDD88793B2-seeklogo 2.png" className="mr-3 h-20 sm:h-36" alt="logo" />
        </Link>
        <p className="text-sm mt-5">
          This is a demo projet you can sign up with your email 
          and password or with google
        </p>


          </div>
           {/*right*/}

          <div className="flex-1">
            <form className="flex flex-col gap-4" >
               <div >
                <Label value="Your username"></Label>
                <TextInput type="text" placeholder="Username" id="username"/>

               </div>
               <div >
                <Label value="Your address"></Label>
                <TextInput type="text" placeholder="Address" id="address"/>

               </div>
               <div >
                <Label value="Your phone number"></Label>
                <TextInput type="number" placeholder="+216 " id="username"/>

               </div>
               <div >
                <Label value="Your email"></Label>
                <TextInput type="email" placeholder="email" id="email"/>

               </div>
               <div >
                <Label value="Your password"></Label>
                <TextInput type="password" placeholder="Password" id="password"/>

               </div>
               <Button gradientDuoTone='pinkToOrange' type="submit" >
                Sign Up
               </Button>

            </form>
            <div className=" flex gap-2 text-sm mt-5">
              <span>Have an account ?</span>
              <Link to='/sign-in' className="text-blue-500">
                  Sign In
              </Link>
            </div>

          </div>

      </div>

    </div>
  )
}
