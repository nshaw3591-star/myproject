import React from 'react'
import { Link, Links } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'

function Hotels({ trip }) {
    return (
        <div>
            <h2 className='text-2xl font-bold mb-4'>Recommended Hotels</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
                {trip?.tripData?.TravelPlan?.HotelOptions?.map((hotel,index) => (
                   <HotelCardItem hotel={hotel} key={index}/>
                ))}
            </div>

        </div>
    )
}

export default Hotels