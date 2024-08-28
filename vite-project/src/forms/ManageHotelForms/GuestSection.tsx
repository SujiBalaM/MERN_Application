import { useFormContext } from "react-hook-form";
import { HotelType } from "./ManageHotelForm";


const GuestSection = () => {
    const {register, formState:{errors} } = useFormContext<HotelType>()
    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Guests</h2>
            <div className="grid grid-cols-2 gap-5 bg-gray-300 p-6">
        <label className="text-gray-700 text-sm font-semibold">
            Adults
        <input type="number" className="rounded border w-full px-3 py-2 font-normal" min={1} {...register("adultCount",{required:"This Field is required"})}/>
        {errors.adultCount && (
          <span className="text-red-500">{errors.adultCount.message}</span>
        )}

        </label>
        <label className="text-gray-700 text-sm font-semibold">
            Children
        <input type="number" className="rounded border w-full px-3 py-2 font-normal" min={0} {...register("childCount",{required:"This Field is required"})}/>
        {errors.childCount && (
          <span className="text-red-500">{errors.childCount.message}</span>
        )}

        </label>

            </div>
        </div>
    )
}

export default GuestSection;