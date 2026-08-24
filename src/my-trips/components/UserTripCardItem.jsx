import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
    const [photoUrl, setPhotoUrl] = useState('')

    useEffect(() => {
        trip && GetPlacePhoto();
    }, [trip])

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip.userSelection?.Location?.label,
        }
        const result = await GetPlaceDetails(data).then(resp => {
            const Photourl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[2].name);
            setPhotoUrl(Photourl);
        })
    }


    return (
        <Link to={ '/view-trip/' + trip?.id }>
            <div className='hover:scale-105 transition-all'>
                <img src={photoUrl ? photoUrl : "/placeholder.jpg"} alt="" className="object-cover rounded-xl h-[220px]" />
                <div>
                    <h2 className='font-bold text-lg text-black'>
                        {trip?.userSelection?.Location?.label}
                    </h2>
                    <h2 className='text-sm text-gray-500'>
                        {trip?.userSelection?.NoOfDays} Days Trip with {trip?.userSelection?.Budget} Budget
                    </h2>
                </div>

            </div>
        </Link>
    )
}

export default UserTripCardItem