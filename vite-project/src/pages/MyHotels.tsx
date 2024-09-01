import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/Appcontext";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
    const {showToast} = useAppContext();
    const {data:hotelData} = useQuery("fetchMyHotels",apiClient.fetchMyHotels ,{
        onError:() => {
            // showToast({message:"Fectching hotels failed", type:"ERROR"})
        }
    })
    console.log(hotelData)
    if(!hotelData) {
        return <span>No hotels available right now!</span>;
    }
    return (
        <div className="space-y-5">
            <span className="flex justify-between">
                <h1 className="text-3xl font-bold">My Hotels</h1>
                <Link to="/add-hotel" className="bg-blue-600 flex font-bold p-2 text-white text-xl hover:bg-blue-500"> Add Hotel</Link>
            </span>
        <div className="grid grid-cols-1 gap-8">
        {hotelData.map((hotel) => (
            <div className="flex flex-col justify-between border border-slate-300 p-8 rounded-lg">
                <h2 className="text-2xl font-bold">{hotel.name}</h2>
                <div className="whitespace-pre-line">{hotel.description}</div>
                <div className="grid grid-cols-5 gap-2">
                    <div className="border border-slate-300 rounded-sm flex items-center">
                        <BsMap className="mr-1"/>
                        {hotel.city},{hotel.country}
                    </div>
                    <div className="border border-slate-300 rounded-sm flex items-center">
                        <BsBuilding className="mr-1"/>
                        {hotel.type}
                    </div>
                    <div className="border border-slate-300 rounded-sm flex items-center">
                        <BiMoney className="mr-1"/>
                        ${hotel.pricePerNight} per night
                    </div>
                    <div className="border border-slate-300 rounded-sm flex items-center">
                        <BiHotel className="mr-1"/>
                        {hotel.adultCount} adults , {hotel.childCount} children
                    </div>
                    <div className="border border-slate-300 rounded-sm flex items-center">
                        <BiStar className="mr-1"/>
                        {hotel.starRating} start rating
                    </div>
                </div>
                <span className="relative flex justify-end top-3">
                    <Link to={`/edit-hotel/${hotel._id}`} className="bg-blue-600 flex font-bold p-2 text-white text-xl hover:bg-blue-500">View Details</Link>
                </span>
            </div>
        ))}
        </div>
        </div>
    )
}
export default MyHotels;