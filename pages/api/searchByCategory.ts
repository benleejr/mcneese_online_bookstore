// pages/api/searchByCategory.ts

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { category, page = 1 } = req.query;
  const itemsPerPage = 25;
  const skip = (Number(page) - 1) * itemsPerPage;

  try {
    const [stationeryResults, bookResults] = await Promise.all([
      prisma.stationery.findMany({
        where: {
          category: { contains: category as string, mode: 'insensitive' },
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
          category: { contains: category as string, mode: 'insensitive' },
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

    const mergedResults = [...stationeryResults, ...bookResults];

    res.status(200).json(mergedResults);
  } catch (error) {
    console.error('Prisma error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  } finally {
    await prisma.$disconnect();
  }
};