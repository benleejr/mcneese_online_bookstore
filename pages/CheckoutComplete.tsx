// pages/CheckoutComplete.tsx
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { PrismaClient } from '@prisma/client';

interface ExtendedSession extends Session {
  accessToken?: string;
}

const prisma = new PrismaClient();

const CheckoutComplete = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { orderId } = router.query;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const session = await getSession() as ExtendedSession;
  
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
            console.log('Book price:', item.book?.price);
            console.log('Stationery price:', item.stationery?.price);

            const price = item.book?.price !== undefined 
              ? parseFloat(item.book.price) 
              : item.stationery?.price !== undefined 
                ? parseFloat(item.stationery.price) 
                : 0;

            console.log('Parsed price:', price);
            const primaryImageURL = item.book ? (item.book.primaryImageURL || 'defaultBookImageUrl') : (item.stationery ? (item.stationery.primaryImageURL || 'defaultStationeryImageUrl') : 'defaultImageUrl');

            console.log('primaryImageURL:', primaryImageURL);
            return {
              itemId: item.type === 'Book' ? item.bookId : item.stationeryId,
              price: price,
              primaryImageURL,
              ...item,
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
              <li key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '1em' }}>
                <img src={item.primaryImageURL} alt={item.book?.title || item.stationery?.name} style={{ width: '100px', marginRight: '1em' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>Title: {item.book?.title || item.stationery?.name}</div>
                    <div>Quantity: {item.quantity}</div>
                    <div>Price: ${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                </div>
              </li>
            ))}
            </ul>
            <p style={{ marginTop: '2em', fontSize: '1.2em', fontWeight: 'bold' }}>Total Price: ${orderDetails.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
          </>
        )}
      </div>
    </Layout>
  );
};

export default CheckoutComplete;