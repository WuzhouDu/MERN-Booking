import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom"
import * as apiClient from '../api-client';
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
    const { hotelId } = useParams();
    const queryClient = useQueryClient();
    const {showToast} = useAppContext();
    const { data: hotel } = useQuery("fetchMyHotelById", () => apiClient.fetchMyHotelById(hotelId || ''), {
        enabled: !!hotelId // verify hotelId has a truth value
    });

    const { mutate, isLoading } = useMutation(apiClient.updateHotelById, {
        onSuccess: () => {
            queryClient.invalidateQueries("fetchMyHotelById");
            showToast({message: "Hotel saved!", type: "SUCCESS"});
        },
        onError: () => { 
            showToast({message: "Error saving hotel", type: "ERROR"});
        },
    })

    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData);
    }

    return <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />
}

export default EditHotel;