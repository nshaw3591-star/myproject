import React, { use, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { IoShare } from "react-icons/io5";
import { GetPlaceDetails } from '@/service/GlobalApi';

const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1500&maxWidthPx=1500&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY
function InfoSection({ trip }) {

  const[photoUrl, setPhotoUrl]=useState('')

  useEffect(() => {
    trip&&GetPlacePhoto();
  },[trip])

  const GetPlacePhoto=async()=>{
    const data={
      textQuery:trip.userSelection?.Location?.label,
    }
    const result=await GetPlaceDetails(data).then(resp=>{
      const Photourl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[2].name);
      setPhotoUrl(Photourl);
    })
  }

  return (
    <div>
      <img src={photoUrl?photoUrl:"/placeholder.jpg"} className='h-[400px] w-full object-cover rounded-xl' />

      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip.userSelection?.Location?.label || "No location found"}</h2>
          <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg'>📅{trip.userSelection?.NoOfDays} Day</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg'>💰{trip.userSelection?.Budget} Budget</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg'>🍻No. Of Traveler: {trip.userSelection?.Traveler}</h2>

          </div>
        </div>
        <Button><IoShare className='bg-black'/></Button>
      </div>
    </div>
  )
}

export default InfoSection