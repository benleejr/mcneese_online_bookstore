// pages/CheckoutComplete.tsx
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CheckoutComplete = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const router = useRouter();
  const { orderId } = router.query;

  useEffect(() => {
    // Function to fetch order data
    const fetchOrderData = async () => {
      const session = await getSession();
      if (session) {
        try {
          const response = await fetch(`/api/order/${orderId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session.accessToken}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setOrderDetails(data);
          } else {
            throw new Error('Failed to fetch order details.');
          }
        } catch (error) {
          console.error('Error fetching order details:', error);
        }
      }
    };

    if (orderId) {
      fetchOrderData();
    }
  }, [orderId]);

  return (
    <Layout>
      <div className="order-confirmation">
        <h1>Thank you for your purchase!</h1>
        {orderDetails && (
          <>
            <h2>Order ID: {orderDetails.id}</h2>
            <ul>
              {orderDetails.orderItems.map((item) => (
                <li key={item.id}>
                  {item.book?.title || item.stationery?.name} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}
                </li>
              ))}
            </ul>
            <p>Total Price: ${orderDetails.total.toFixed(2)}</p>
          </>
        )}
      </div>
    </Layout>
  );
};

export default CheckoutComplete;