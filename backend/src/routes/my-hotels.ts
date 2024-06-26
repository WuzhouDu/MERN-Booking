import express, { Request, Response } from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import Hotel from '../models/hotel';
import verifyToken from '../middleware/auth';
import { body } from 'express-validator';
import { HotelType } from '../shared/types';

const myHotelRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
})


// api/my-hotels
myHotelRouter.post('/',
    verifyToken, [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight").notEmpty().isNumeric().withMessage("PricePerNight is required and number"),
    body("facilities").notEmpty().isArray().withMessage("Facilities is required and arry"),
],
    upload.array("imageFiles", 6),
    async (req: Request, res: Response) => {
        try {
            const imageFiles = req.files as Express.Multer.File[];
            const newHotel: HotelType = req.body;
            // 1. upload images to cloudinary
            const imageURLs = await uploadImages(imageFiles);
            // 2. if upload successful, create new hotel
            newHotel.imageUrls = imageURLs;
            newHotel.lastUpdated = new Date();
            newHotel.usrId = req.userId;

            // 3. save new hotel to db
            const hotel = new Hotel(newHotel);
            await hotel.save();

            res.status(201).send(hotel);
        } catch (e) {
            console.log("Error creating hotel:", e);
            res.status(500).json({ message: "Something went wrong" });
        }
    });

myHotelRouter.get('/', verifyToken, async (req: Request, res: Response) => {
    try {
        const hotels = await Hotel.find({ usrId: req.userId });
        res.json(hotels);
    } catch (err) {
        res.status(500).json({ message: "Error fetching hotels" });
    }
})

myHotelRouter.get('/:id', verifyToken, async (req: Request, res: Response) => {
    const id = req.params.id.toString();
    try {
        const hotel = await Hotel.findOne({
            _id: id,
            usrId: req.userId,
        })
        res.json(hotel);
    } catch (error) {
        res.status(500).json({ message: "Error fetching hotels" });
    }
})

myHotelRouter.put("/:hotelId", verifyToken, upload.array("imageFiles"), async (req: Request, res: Response) => {
    try {
        const updatedHotel: HotelType = req.body;
        updatedHotel.lastUpdated = new Date();
        const hotel = await Hotel.findOneAndUpdate({
            _id: req.params.hotelId,
            usrId: req.userId
        }, updatedHotel, { new: true });

        if (!hotel) {
            return res.status(404).json({ message: "hotel not found" });
        }

        const files = req.files as Express.Multer.File[];
        const updatedImageUrls = await uploadImages(files);
        hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])];
        await hotel.save();
        res.status(201).json(hotel);
    } catch (error) {
        res.status(500).json({ message: "somnething error" })
    }
})



async function uploadImages(imageFiles: Express.Multer.File[]) {
    const uploadPromise = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    });



    const imageURLs = await Promise.all(uploadPromise);
    return imageURLs;
}

export default myHotelRouter;