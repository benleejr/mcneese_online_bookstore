// pages/api/upload.js
import cloudinary from 'cloudinary';

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default async (req, res) => {
  const { image, title } = req.body;
  
  try {
    const uploadResponse = await cloudinary.v2.uploader.upload(image, { public_id: title });
    res.status(200).json({ secure_url: uploadResponse.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};