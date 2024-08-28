import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForms/ManageHotelForm";
import { useAppContext } from "../contexts/Appcontext";
import * as apiClient from '../api-client'
 
const AddHotel = () => {
    const{showToast} = useAppContext();
    const {mutate,isLoading} = useMutation(apiClient.addMyHotel,{
        onSuccess:() => {
            showToast({message:"Hotel Saved Successfully!",type:"SUCCESS"})
        },
        onError:() => {
            showToast({message:"Failed to Save!",type:"ERROR"})

        }
    })
    const handleSave = (hotelFormData:FormData) => {
        console.log(hotelFormData)
        mutate(hotelFormData)
    }
    return (<ManageHotelForm onSave={handleSave} isLoading={isLoading}/>)
}

export default AddHotel;