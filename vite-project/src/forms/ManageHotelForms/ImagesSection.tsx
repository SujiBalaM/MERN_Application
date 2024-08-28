import { useFormContext } from "react-hook-form";
import { HotelType } from "./ManageHotelForm";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },watch
  } = useFormContext<HotelType>();
  const existingImageUrls = watch("imageUrls");


  return (
    <div>
      <h2 className="text-2xl font-bold mb-3"> Images</h2>
      <div className="rounded border p-4 flex flex-col gap-4">
        <input type="file"  multiple  accept="image/*" className="w-full text-gray-700 font-normal"  {...register("imageFiles",{
        validate:(imageFiles)=>{
            const totalLength = imageFiles.length + (existingImageUrls?.length || 0);
            ;
            if(totalLength === 0) {
                return "Atleast one image shuold be uploaded"
            }
            if(totalLength > 6) {
                return "Maxmium 6 images can upload"
            }
            return true;
        }})}/>
      </div>
      {errors.imageFiles && (
          <span className="text-red-500">{errors.imageFiles.message}</span>
          )}
    </div>
  );
};

export default ImagesSection;
