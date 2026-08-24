import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button'; // Assuming Button component is imported
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";// Assuming Popover components are imported 
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from 'axios';
import { FcGoogle } from "react-icons/fc";

function Header() {
  const [openDialog, setOpenDialog] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    console.log(user);
  }, [])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  }
  )


  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      toast.success("Logged in successfully!");
      window.location.reload();
    })
  }

  return (
    <div className="relative w-full z-50 p-1 px-6 flex justify-between items-center bg-transparent">
      {/* Logo */}
      <img src="/logo.jpeg" alt="Logo" className="h-10 sm:h-10 lg:h-15 bg-transparent" /> {/* Adjust logo size based on screen size */}

      <div>
        {user ?
          <div className='flex items-center gap-5'>
            <a href="/create-trip">
            <Button variant="outline" className="rounded-full text-black">+ Create Trip</Button>
            </a>
            <a href="/my-trips">
            <Button variant="outline" className="rounded-full text-black">My Trips</Button>
            </a>
            <Popover>
              <PopoverTrigger asChild>
                <img src={user?.picture} alt="User Picture" className='h-[40px] w-[40px] min-w-[40px] rounded-full ml-2 object-cover border shadow-sm' />
              </PopoverTrigger>
              <PopoverContent>
                <a href="/"><h2 className='cursor-pointer text-black' onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Logout</h2>
                </a>
              </PopoverContent>
            </Popover>
          </div>
          :
          <Button variant="outline" size="sm" className="ml-2 text-black" onClick={() => setOpenDialog(true)}>
            Sign In
          </Button>
        }
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.jpeg" />
              <h2 className='font-bold text-lg mt-8'>Sign With Google</h2>
              <p>Sign to the App with Google authentication securely</p>

              <Button
                onClick={login}
                className='w-full mt-5 flex gap-4 items-center text-black'>
                <FcGoogle className='h-7 w-7' />
                Sign In With Google</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
