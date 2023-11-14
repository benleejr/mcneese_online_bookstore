// pages/api/create-order.ts
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

const prisma = new PrismaClient();

async function getUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true },
  });
}

export default async function handle(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const session = await getServerSession(req, res, authOptions);
  console.log("Session:", session);

  if (!session || !session.user || !session.user.email) {
    return res.status(403).json({ error: 'You must be logged in to create an order.' });
  }

  const user = await getUserByEmail(session.user.email);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { items, total } = req.body;
  console.log('Received total:', total);

  try {
    const order = await prisma.$transaction(async (prisma) => {
      const newOrder = await prisma.order.create({
        data: {
          userId: user.id,
          total: total,
          status: 'Pending',
        },
      });
        
      const orderItemPromises = items.map(item => {
        return prisma.orderItem.create({
          data: {
            orderId: newOrder.id,
            bookId: item.bookId,
            stationeryId: item.stationeryId,
            quantity: item.quantity,
          },
        });
      });

        await Promise.all(orderItemPromises);

        return newOrder;
      });

      res.status(200).json({ orderId: order.id });
    } catch (error) {
      console.error('Request error', error);
      res.status(500).json({ error: 'Error creating order', errorMessage: error.message });
    }
  }
