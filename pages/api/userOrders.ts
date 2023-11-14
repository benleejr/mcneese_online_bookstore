// pages/api/order/[userOrders].ts

import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const session = await getSession({ req });

  if (req.method === 'GET') {
    if (!session) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    try {
      const orders = await prisma.order.findMany({
        where: { userId: session.user.id },
      });

      if (orders) {
        res.status(200).json(orders);
      } else {
        res.status(404).json({ error: 'No orders found' });
      }
    } catch (error) {
      console.error('Request error', error);
      res.status(500).json({ error: 'Error retrieving orders', errorMessage: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}