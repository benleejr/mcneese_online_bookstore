// pages/api/save.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
  const formData = req.body;

  console.log('formData', formData);


  try {
    console.log('Received type:', formData.type);

    if (formData.type === 'book') {
      const book = await prisma.book.create({
        data: {
          title: formData.title,
          author: formData.author,
          ISBN: formData.ISBN,
          category: formData.category,
          price: parseFloat(formData.price),
          language: formData.language,
          availability: formData.availability,
          description: formData.description,
          publisher: formData.publisher,
          publishedYear: parseInt(formData.publishedYear, 10),
          imageURL: formData.imageURL,
          stock: parseInt(formData.stock, 10),
          // Assuming the createdAt and updatedAt fields will be handled automatically by Prisma
        },
      });
      res.status(200).json(book);
    } else if (formData.type === 'stationery') {
      const stationery = await prisma.stationery.create({
        data: {
          name: formData.name,
          brand: formData.brand,
          price: parseFloat(formData.price),
          availability: formData.availability,
          description: formData.description,
          category: formData.category,
          stock: parseInt(formData.stock, 10),
          imageURL: formData.imageURL,
          // Assuming the createdAt and updatedAt fields will be handled automatically by Prisma
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
};