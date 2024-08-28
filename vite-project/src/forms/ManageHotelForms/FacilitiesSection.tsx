import { useFormContext } from "react-hook-form"
import { hotelFacilities } from "../../config/hotel-options-config"
import { HotelType } from "./ManageHotelForm"

const FacilitiesSection = () => {
    const {register,formState:{errors}} = useFormContext<HotelType>()
    return(
        <div>
            <h2 className="text-2xl font-bold mb-3">Facilities</h2>
            <div className="grid grid-cols-5 gap-3">
                {hotelFacilities.map((facility) => (
                    <label className="text-sm gap-1 flex text-gray-700">
                        <input type="checkbox"  value={facility} {...register("facilities",{required:"Atleast one Facility is required"})}/>
                        {facility}
                    </label>
                ))}
            </div>
            {errors.facilities && (
          <span className="text-red-500">{errors.facilities.message}</span>
        )}

        </div>
    )
}

export default FacilitiesSection