// pages/api/order/latest.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const latestOrder = await prisma.order.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!latestOrder) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.status(200).json(latestOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}