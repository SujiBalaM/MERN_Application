import { useFormContext } from "react-hook-form"
import { hotelOptions } from "../../config/hotel-options-config"
import { HotelType } from "./ManageHotelForm";

const TypeSection = () => {
    const {register,watch,formState:{errors}} = useFormContext<HotelType>();
    const typeWatch = watch("type")

    return(
        <div className="gap-10">
            <h2 className="text-2xl font-bold mb-3">Type</h2>
            <div className="grid grid-cols-5 gap-2 ">
                {hotelOptions.map((item) => (
                    <label className={typeWatch === item ? "cursor-pointer rounded-full bg-blue-300 text-sm px-2 py-2 font-semibold":"cursor-pointer rounded-full bg-gray-300 text-sm px-2 py-2 font-semibold"}>
                        <input type="radio" className="hidden" value={item} {...register("type",{required:"This Field is required"})} />
                        <span>{item}</span>
                    </label>
                ))}
            </div>
            {errors.type && (
          <span className="text-red-500">{errors.type.message}</span>
        )}

        </div>
    )
}

export default TypeSection;