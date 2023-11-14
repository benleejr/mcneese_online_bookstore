// pages/CheckoutComplete.tsx
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CheckoutComplete = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { orderId } = router.query;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const session = await getSession();
  
        // Fetch the most recent order
        const orderResponse = await fetch(`/api/order/latest`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.accessToken}`,
          },
        });
  
        if (!orderResponse.ok) {
          throw new Error('Failed to fetch the latest order.');
        }
  
        const orderData = await orderResponse.json();
        const orderId = orderData.id;
  
        const itemsResponse = await fetch(`/api/orderItems/${orderId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.accessToken}`,
          },
        });
  
        if (!itemsResponse.ok) {
          throw new Error('Failed to fetch the items for the order.');
        }
  
        const itemsData = await itemsResponse.json();
        const updatedOrderDetails = {
          ...orderData,
          items: itemsData.map(item => {
            const price = item.type === 'Book' ? (item.book?.price || 0) * item.quantity : (item.stationery?.price || 0) * item.quantity;
            const primaryImageURL = item.type === 'Book' ? item.book?.primaryImageURL || 'defaultBookImageUrl' : item.stationery?.primaryImageURL || 'defaultStationeryImageUrl';

            // Log the primaryImageURL to check if it's correct
            console.log('primaryImageURL:', primaryImageURL);

            return {
              ...item,
              itemId: item.type === 'Book' ? item.bookId : item.stationeryId,
              price,
              primaryImageURL,
            };
          }),
          total: itemsData.reduce((total, item) => total + parseFloat((((item.type === 'Book' ? item.book?.price : item.stationery?.price) || 0) * item.quantity).toFixed(2)), 0),
        };
  
        setOrderDetails(updatedOrderDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };
  
    fetchOrderDetails();
  }, []);

  if (loading) {
    return <div>Loading Order Details...</div>;
  }

  return (
    <Layout>
      <div className="order-confirmation">
        <h1>Thank you for your purchase!</h1>
        {orderDetails && (
          <>
            <h2>Order ID: {orderDetails.id}</h2>
            <ul>
              {orderDetails.items.map((item) => (
                <li key={item.id}>
                  {item.book?.title || item.stationery?.name} - Quantity: {item.quantity} - Price: ${(item.book?.price * item.quantity)?.toFixed(2) || (item.stationery?.price * item.quantity)?.toFixed(2)}
                  <img src={item.primaryImageURL} alt={item.book?.title || item.stationery?.name} />
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