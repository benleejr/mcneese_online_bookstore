// pages/api/search.ts

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { search, page = 1 } = req.query;
  const itemsPerPage = 25;
  const skip = (Number(page) - 1) * itemsPerPage;

  try {
    const [stationeryResults, bookResults] = await Promise.all([
      prisma.stationery.findMany({
        where: {
          name: {
            contains: search as string,
            mode: 'insensitive',  // Case-insensitive search
          },
        },
        select: {
          id: true,
          name: true,
          primaryImageURL: true,
        },
        skip,
        take: itemsPerPage,
      }),
      prisma.book.findMany({
        where: {
          // Assuming you have a 'title' field to search in the Book table. Adjust the field name and logic as needed.
          title: {
            contains: search as string,
            mode: 'insensitive',  // Case-insensitive search
          },
        },
        select: {
          id: true,
          title: true,
          primaryImageURL: true,
        },
        skip,
        take: itemsPerPage,
      }),
    ]);

    // Merge and sort the results if necessary. This is a simplistic merge and does not handle pagination across two tables.
    const mergedResults = [...stationeryResults, ...bookResults];

    res.status(200).json(mergedResults);
  } catch (error) {
      console.error('Prisma error:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
  } finally {
    await prisma.$disconnect();
  }
};
