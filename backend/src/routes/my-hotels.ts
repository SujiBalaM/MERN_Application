import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel from "../models/hotels";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
import { HotelType } from "../shared/type";
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel Type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per Night is required and it must be a numeric"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;
      //1.upload the images to cloudinary
      const imageURLs = await uploadImages(imageFiles);
      newHotel.imageUrls = imageURLs;
      newHotel.lastUpdated = new Date();
      newHotel.userId = (req as any).userId;
      //3.save the new hotel in our database
      const hotel = new Hotel(newHotel);
      await hotel.save();
      //4.return a 201 status
      res.status(201).send(hotel);
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/",verifyToken, async (req:Request,res:Response) => {
  try{
    const hotels = await Hotel.find({userId:(req as any).userId});
    res.json(hotels)
  }catch(e) {
    res.status(500).json({message:"Fetching hotels failed!"})
  }

})

router.get("/:id", verifyToken, async (req:Request,res:Response) => {
  const id = req.params.id.toString();

  try {
    const hotel = await Hotel.findOne({
      _id:id,
      userId:(req as any).userId
    })
    res.json(hotel)
  }catch(error) {
    res.status(500).send({message:"Error in fetching hotels"})
  }
})

router.put("/:hotelId",verifyToken,upload.array("imageFiles"),async (req:Request,res:Response) => {
try {
  const updatedHotel:HotelType = req.body;
  updatedHotel.lastUpdated = new Date();

  const hotel = await Hotel.findOneAndUpdate({
    _id:req.params.hotelId,
    userId: (req as any).userId
  },updatedHotel,{new:true})

  if(!hotel){
    res.status(404).json({message:"Hotel not found"})
  }
  const files = req.files as Express.Multer.File[];
  const updatedImageUrls = await uploadImages(files);

  (hotel as any).imageUrls = [...updatedImageUrls,...(updatedHotel.imageUrls || [])];
  await hotel?.save();
  return res.status(201).json(hotel)
} catch(error) {
  res.status(500).json({message:"Something went wrong while updating"})
}
})
async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });
  //2.if upload is successfull, add the URLS to the new Hotel
  const imageURLs = await Promise.all(uploadPromises);
  return imageURLs;
}

export default router;

