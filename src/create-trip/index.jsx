import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectTravelesList } from '@/constants/options';
import { SelectBudgetOptions } from '@/constants/options';
import { Import, Save } from 'lucide-react';
import React, { useEffect } from 'react'
import { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { toast, Toaster } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { chatSession } from '@/service/AIModel';





function CreateTrip() {
  const [place, setPlace] = useState();

  const [formData, setFormData] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  }
  )

  const OnGenerateTrip = async () => {

    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDialog(true);
      return;
    }


    if (!formData?.NoOfDays || !formData?.Location || !formData?.Budget || !formData?.Traveler) {
      toast("Please fill all the details.");
      return;
    }

    if (formData?.NoOfDays > 20) {
      toast("Number of days cannot be more than 20.");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{Location}', formData?.Location?.label)
      .replace('{totalDays}', formData?.NoOfDays)
      .replace('{traveler}', formData?.Traveler)
      .replace('{budget}', formData?.Budget)
      .replace('{totalDays}', formData?.NoOfDays);

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log("--", result?.response?.text());
    setLoading(false);
    toast.success("Trip Generated Successfully!");
    SaveAiTrip(result?.response?.text());
  }


  // const SaveAiTrip = async (TripData) => {
  //   // Add a new document in collection "cities"
  //   setLoading(true);
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   const docId = Date.now().toString();

  //   await setDoc(doc(db, "AITrips", docId), {
  //     userSelection: formData,
  //     tripData:JSON.parse(TripData),
  //     userEmail: user?.email,
  //     id: docId,
  //   });
  //   setLoading(false); 
  //   navigate(`/view-trip/`+docId);
  // }

  //   const SaveAiTrip = async (TripData) => {
  //   try {
  //     setLoading(true);

  //     const user = JSON.parse(localStorage.getItem("user"));
  //     const docId = Date.now().toString();

  //     // 🔹 clean AI markdown
  //     const cleanTripData = TripData
  //       .replace(/```json/g, "")
  //       .replace(/```/g, "")
  //       .trim();

  //     // 🔹 convert string → JSON
  //     const parsedTripData = JSON.parse(cleanTripData);

  //     await setDoc(doc(db, "AITrips", docId), {
  //       userSelection: formData,
  //       tripData: parsedTripData,
  //       userEmail: user?.email,
  //       id: docId,
  //     });

  //     setLoading(false);
  //     navigate(`/view-trip/${docId}`);
  //   } catch (err) {
  //     setLoading(false);
  //     console.error(err);
  //     toast.error("AI response is not valid JSON");
  //   }
  // };

  const SaveAiTrip = async (TripData) => {
    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user"));
      const docId = Date.now().toString();

      // ✅ extract ONLY JSON
      const jsonOnly = extractJSON(TripData);

      // ✅ parse safely
      const parsedTripData = JSON.parse(jsonOnly);

      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: parsedTripData,
        userEmail: user?.email,
        id: docId,
      });

      setLoading(false);
      navigate(`/view-trip/${docId}`);
    } catch (error) {
      setLoading(false);
      console.error("AI JSON ERROR:", error);
      toast.error("AI response format is invalid");
    }
  };


  const extractJSON = (text) => {
    const firstBrace = text.indexOf("{");
    const lastBrace = text.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1) {
      throw new Error("No JSON found in AI response");
    }

    return text.substring(firstBrace, lastBrace + 1);
  };




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
      OnGenerateTrip();
    })
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5  pt-10'>
      <h2 className='font-bold text-4xl text-center text-gray-800 mb-6'>
        Create Your Trip 🏕️🌴
      </h2>
      <p className='text-center text-gray-500 text-lg mb-8'>
        Plan your next adventure and get started with all the details!
      </p>

      <div className='mt-20 flex flex-col gap-10 '>
        <div>
          <h2 className='text-xl my-3 font-medium'>
            What is your Destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange('Location', v);
              }

            }}
          />

        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>
            How many days are you planning your trip?
          </h2>
          <Input placeholder={'Ex-5'} type="number"
            onChange={(e) => handleInputChange('NoOfDays', e.target.value)}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>
            What is your Budget?
          </h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('Budget', item.title)}
                className={`p-4 border cursor-pointer 
              rounded-lg hover:shadow-lg
              ${formData?.Budget == item.title && 'shadow-lg border-black'}
              `}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>
            Who do you plan on travelling with on your next adventure?
          </h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelesList.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('Traveler', item.people)}
                className={`p-4 border cursor-pointer rounded-lg 
              hover:shadow-lg
                ${formData?.Traveler == item.people && 'shadow-lg border-black'}
              `}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='my-10 justify-end flex text-lg'>
        <Button
          disabled={loading}
          variant="outline"  onClick={OnGenerateTrip}>
          {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'}
        </Button>
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

export default CreateTrip
