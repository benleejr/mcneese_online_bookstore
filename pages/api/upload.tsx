// pages/api/upload.tsx
import { NextApiRequest, NextApiResponse } from 'next';
import multer, { Multer } from 'multer';
import cloudinary from 'cloudinary';
import { ServerResponse, IncomingMessage } from 'http';


interface NextApiRequestWithMulter extends NextApiRequest {
  files: Express.Multer.File[];
}

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequestWithMulter, res: NextApiResponse) => {
  const multerAny = multer().any();
  await new Promise<void>((resolve, reject) =>
    multerAny(req as any, res as any, (err) => (err ? reject(err) : resolve()))
  );

  if (req.method === 'POST') {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const file = req.files[0];
      const b64 = Buffer.from(file.buffer).toString('base64');
      const dataURI = `data:${file.mimetype};base64,${b64}`;
      console.log('Uploading to Cloudinary...');
      const uploadResponse = await cloudinary.v2.uploader.upload(dataURI, { public_id: req.body.title });
      console.log('Upload successful:', uploadResponse.secure_url);
      res.status(200).json({ secure_url: uploadResponse.secure_url });

    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  } else {
    // Handle any other HTTP method
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;
