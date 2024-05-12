import { FormProvider, useForm } from "react-hook-form";
import HotelDetailSection from "./HotelDetailSection";
import TypeSection from "./TypeSection";

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

const ManageHotelForm = () => {
    const formMethods = useForm<HotelFormData>();
    return (
        <FormProvider {...formMethods}>
            <form>
                <HotelDetailSection />
                <TypeSection />
            </form>
        </FormProvider>
        
    )
}

export default ManageHotelForm;