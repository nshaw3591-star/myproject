import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { User } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';
function MyTrips() {
    useEffect(() => {
        GetUserTrips();
    }, [])
    const navigation = useNavigation();
    const [userTrips, setUserTrips] = useState([]);
    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            navigation("/");
            return;
        }
        
        const q = query(collection(db, "AITrips"), where("userEmail", "==", user?.email));
        const querSnapshot = await getDocs(q);
        setUserTrips([]);
        querSnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            setUserTrips(preVal=>[...preVal,doc.data()]);
        });
    };
    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>My Trips</h2>

            <div className='grid gird-cols-2 mt-10 md:grid-cols-3 gap-5'>
                {userTrips?.length>0?userTrips.map((trip,index) =>(
                    <UserTripCardItem key={index} trip={trip} />
                ))
                :[1,2,3,4,5,6].map((item,index)=>(
                    <div key={index} className='h-[220px] w-full bg-slate-200 animate-pulse rounded-xl'>

                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default MyTrips