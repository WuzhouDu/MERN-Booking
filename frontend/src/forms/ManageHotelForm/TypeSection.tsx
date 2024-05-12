import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
    const {register} = useFormContext<HotelFormData>();
    return (
        <div>
            <h2 className="text-2xl mb-3 font-bold">Type</h2>
            <div className="grid grid-col-5 gap-2">
                {hotelTypes.map((type) => (
                    <label>
                        <input type="radio" value={type} {...register("type", {
                            required: "hotel type is required"
                        })}></input>
                        <span>{type}</span>
                    </label>
                ))}
            </div>
        </div>
    )
}

export default TypeSection;