// pages/ViewOrders.tsx

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const ViewOrders = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // @ts-ignore
    if (session?.user?.id) {
      // @ts-ignore
      axios.get(`/api/userOrders?userId=${session.user.id}`) 
        .then(response => {
          const fetchedOrders = response.data;
          Promise.all(fetchedOrders.map(order => 
            axios.get(`/api/orderItems/${order.id}`)
              .then(response => {
                const orderItems = response.data.map(item => {
                  const price = item.book?.price !== undefined 
                    ? parseFloat(item.book.price) 
                    : item.stationery?.price !== undefined 
                      ? parseFloat(item.stationery.price) 
                      : 0;
                  return { ...item, price };
                });
                const total = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
                return { ...order, orderItems, total };
              })
          ))
          .then(ordersWithItems => setOrders(ordersWithItems));
        })
        .catch(error => {
          console.error('Error fetching orders:', error);
        });
    }
  }, [session]);

  return (
    <Layout>
      <div>
        <h1>Your Orders</h1>
        {orders.map(order => (
          <div key={order.id}>
            <h2>Order ID: {order.id}</h2>
            <p>Total: {order.total.toFixed(2)}</p>
            <p>Status: {order.status}</p>
            {order.orderItems.map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <img src={item.book?.primaryImageURL || item.stationery?.primaryImageURL} alt="Item" style={{ width: '100px', height: '100px', marginRight: '10px' }} />
                <div style={{ flex: 1 }}>
                <p>Book Title: {item.book?.title}</p>
                <p>Stationery Name: {item.stationery?.name}</p>
                <p>Quantity: {item.quantity}</p>
                </div>
                <p>Price: {(item.price * item.quantity).toFixed(2)}</p>
            </div>
            ))}

            <p style={{ marginTop: '20px', fontSize: '20px', fontWeight: 'bold' }}>Total: {order.total.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ViewOrders;