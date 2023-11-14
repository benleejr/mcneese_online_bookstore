// pages/api/orderItems/[orderId].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { orderId } = req.query;

  try {
    const orderItems = await prisma.orderItem.findMany({
      where: {
        orderId: orderId as string,
      },
      include: {
        book: {
          select: {
            title: true,
            price: true,
            primaryImageURL: true,
          },
        },
        stationery: {
          select: {
            name: true,
            price: true,
            primaryImageURL: true,
          },
        },
      },
    });

    if (!orderItems.length) {
      return res.status(404).json({ message: 'No items found for this order' });
    }

    console.log(orderItems);
    res.status(200).json(orderItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}