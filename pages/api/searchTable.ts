// pages/api/searchTable.ts

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { page = 1 } = req.query;
  const table = Array.isArray(req.query.table) ? req.query.table[0] : req.query.table;
  const itemsPerPage = 25;
  const skip = (Number(page) - 1) * itemsPerPage;

  try {
    let results;
    if (table.toLowerCase() === 'stationery') {
        results = await prisma.$queryRawUnsafe(`
          SELECT id, name as title, "primaryImageURL" FROM "Stationery"
          LIMIT ${itemsPerPage} OFFSET ${skip}
        `);
      } else if (table.toLowerCase() === 'book') {
        results = await prisma.$queryRawUnsafe(`
          SELECT id, title, "primaryImageURL" FROM "Book"
          LIMIT ${itemsPerPage} OFFSET ${skip}
        `);
      } else {
        res.status(400).json({ error: 'Invalid table parameter' });
        return;
      }

    res.status(200).json(results);
  } catch (error) {
    console.error('Prisma error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  } finally {
    await prisma.$disconnect();
  }
};