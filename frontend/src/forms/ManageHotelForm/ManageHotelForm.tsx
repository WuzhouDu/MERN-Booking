import { FormProvider, useForm } from "react-hook-form";
import HotelDetailSection from "./HotelDetailSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    starRating: number;
    imageFiles: FileList;
};

type Props = {
    onSave: (hotelFormData: FormData) => void;
    isLoading: boolean;
}

const ManageHotelForm = ({ onSave, isLoading }: Props) => {
    const formMethods = useForm<HotelFormData>();
    const { handleSubmit } = formMethods;

    const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
        const formmData = new FormData();
        formmData.append("name", formDataJson.name);
        formmData.append("city", formDataJson.city);
        formmData.append("description", formDataJson.description);
        formmData.append("country", formDataJson.country);
        formmData.append("type", formDataJson.type);
        formmData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formmData.append("starRating", formDataJson.starRating.toString());
        formmData.append("adultCount", formDataJson.adultCount.toString());
        formmData.append("childCount", formDataJson.childCount.toString());
        formDataJson.facilities.forEach((facility, index) => {
            formmData.append(`facilities[${index}]`, facility)
        });

        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            formmData.append(`imageFiles`, imageFile);
        })
        onSave(formmData);
    })
    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-10" onSubmit={onSubmit}>
                <HotelDetailSection />
                <TypeSection />
                <FacilitiesSection />
                <GuestsSection />
                <ImagesSection />
                <span className="flex justify-end">
                    <button type="submit" disabled={isLoading} className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-600">{isLoading ? "Save..." : "Save"}</button>
                </span>
            </form>
        </FormProvider>

    )
}

export default ManageHotelForm;