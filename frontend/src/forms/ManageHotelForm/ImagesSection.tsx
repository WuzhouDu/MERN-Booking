import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"

const ImagesSection = () => {
    const { register, formState: { errors }, watch, setValue } = useFormContext<HotelFormData>();
    const existingUrls = watch("imageUrls");

    const handleDelete = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        imageUrl: string
    ) => {
        event.preventDefault();
        setValue("imageUrls", existingUrls.filter((url) => url !== imageUrl))
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="flex flex-col gap-4 border rounded p-4">
                {existingUrls && (
                    <div className="grid grid-cols-6 gap-4">{existingUrls.map((url) => (
                        <div className="relative group" key={url}>
                            <img src={url} className="min-h-full object-cover" />
                            <button onClick={(event) => handleDelete(event, url)} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white">Delete</button>
                        </div>
                    ))} </div>
                )}

                <input type="file" multiple accept="image/*" className="w-fill text-gray-700 font-normal" {...register("imageFiles", {
                    validate: (imageFiles) => {
                        const totalLength = imageFiles.length + (existingUrls?.length || 0);
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