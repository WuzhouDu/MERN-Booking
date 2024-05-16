import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"

const ImagesSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="flex flex-col gap-4 border rounded p-4">
                <input type="file" multiple accept="image/*" className="w-fill text-gray-700 font-normal" {...register("imageFiles", {
                    validate: (imageFiles) => {
                        const totalLength = imageFiles.length;
                        if (totalLength === 0) {
                            return "At least 1 image is required";
                        }
                        else if (totalLength > 6) {
                            return "At most 6 images can be uploaded";
                        }
                    }
                })} />
            </div>
            {errors.imageFiles && (
                <span className="text-red-500 font-bold text-sm">{errors.imageFiles.message}</span>
            )}
        </div>
    )
}

export default ImagesSection;