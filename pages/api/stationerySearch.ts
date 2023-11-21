// pages/api/stationerySearch.ts

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { search, page = 1 } = req.query;
  const itemsPerPage = 25;
  const skip = (Number(page) - 1) * itemsPerPage;

  try {
    const stationeryResults = await prisma.stationery.findMany({
      where: {
        OR: [
          { name: { contains: search as string, mode: 'insensitive' } },
          { brand: { contains: search as string, mode: 'insensitive' } },
          { category: { contains: search as string, mode: 'insensitive' } },
          { description: { contains: search as string, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        name: true,
        primaryImageURL: true,
      },
      skip,
      take: itemsPerPage,
    });

    res.status(200).json(stationeryResults);
  } catch (error) {
    console.error('Prisma error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  } finally {
    await prisma.$disconnect();
  }
};