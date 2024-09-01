import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from '../api-client'
import ManageHotelForm from "../forms/ManageHotelForms/ManageHotelForm";
import { useAppContext } from "../contexts/Appcontext";

const EditHotel = () => {
    const {hotelId} = useParams();
    const {showToast} = useAppContext()

    const {data:hotelData} = useQuery("fetchHotelByid", () => apiClient.fetchMyHotelsById(hotelId || ''),{
        enabled:!!hotelId
    })
    const {mutate,isLoading} = useMutation(apiClient.updateMyHotelById,{
        onSuccess:() => {
            showToast({message:"Hotel Updated Successfully!" , type:"SUCCESS"})
        },
        onError:() => {
            showToast({message:"Something went wrong while Updating" , type:"ERROR"})

        }
    })

    const handleSave = (hotelFormData:FormData) => {
        mutate(hotelFormData)
    }

    return <ManageHotelForm hotel={hotelData} onSave={handleSave} isLoading={isLoading}/>
}

export default EditHotel;