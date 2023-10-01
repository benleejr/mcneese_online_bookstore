const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('books'), async (req, res) => {
    const filePath = req.file.path;
  
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', async (row) => {
        const { title, author, ISBN, category, price, cloudinaryImageUrl } = row;
  
        // Insert the book into the database
        try {
          await prisma.book.create({
            data: {
              title,
              author,
              ISBN,
              category,
              price: parseFloat(price), // Ensure price is a float
              cloudinaryImageUrl,
            },
          });
        } catch (err) {
          console.error('Error inserting data', err);
        }
      })
      .on('end', () => {
        // Delete the temporary file
        fs.unlink(filePath, (err) => {
          if (err) console.error('Error deleting file', err);
        });
  
        res.send('CSV file has been processed and books added to the database.');
      });
  });
  
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  