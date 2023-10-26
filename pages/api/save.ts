// pages/api/save.ts
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false
  }
};

const prisma = new PrismaClient();
const upload = multer({ storage: multer.memoryStorage() });

export default async (req: NextApiRequest, res: NextApiResponse) => {

  upload.any()(req, res, async (err) => {
    // Multer errors
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'File upload failed' });
    }

    const { type } = req.body;

    console.log('Form', type);

    try {
      if (type === 'book') {
        const book = await prisma.book.create({
          data: {
            title: req.body.title,
            author: req.body.author,
            ISBN: req.body.ISBN,
            category: req.body.category,
            price: parseFloat(req.body.price),
            language: req.body.language,
            availability: JSON.parse(req.body.availability.toLowerCase()),
            description: req.body.description,
            publisher: req.body.publisher,
            publishedYear: parseInt(req.body.publishedYear, 10),
            imageURL: req.body.imageURL,
            stock: parseInt(req.body.stock, 10),
          },
        });
        res.status(200).json(book);
      } else if (type === 'stationery') {
        const stationery = await prisma.stationery.create({
          data: {
            name: req.body.name,
            brand: req.body.brand,
            price: parseFloat(req.body.price),
            availability: JSON.parse(req.body.availability.toLowerCase()),
            description: req.body.description,
            category: req.body.category,
            stock: parseInt(req.body.stock, 10),
            imageURL: req.body.imageURL,
          },
        });
        res.status(200).json(stationery);
      } else {
        res.status(400).json({ error: 'Invalid product type' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });  // This line was missing to close the handler function
};
