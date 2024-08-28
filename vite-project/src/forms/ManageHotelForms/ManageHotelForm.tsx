import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImagesSection from "./ImagesSection";

export type HotelType = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};
type Props =  {
onSave:(hotelFormData:FormData)=>void,
isLoading:boolean;
} 
const ManageHotelForm = ({onSave,isLoading}:Props) => {
  const formMethods = useForm<HotelType>();
  const {handleSubmit} = formMethods;

  const onSubmit = handleSubmit((formDataJson:HotelType) =>{
    console.log(formDataJson)
    const formData = new FormData();
    //create new formData object and call API
    formData.append("name",formDataJson.name);
    formData.append("city",formDataJson.city);
    formData.append("country",formDataJson.country);
    formData.append("description",formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight",formDataJson.pricePerNight.toString());
    formData.append("starRating",formDataJson.starRating.toString());
    formData.append("adultCount",formDataJson.adultCount.toString());
    formData.append("childCount",formDataJson.childCount.toString());
    formDataJson.facilities.forEach((element,index)=>formData.append(`facilities[${index}]`,element));
    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((e) => formData.append(`imageFiles`,e));
    onSave(formData)


  })
  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button  disabled={isLoading} type="submit" className="bg-blue-600 text-white p-2 font-bold disabled:bg-gray-500 hover:bg-blue-500 text-xl">
            Save
          </button>

        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
