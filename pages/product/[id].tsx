// pages/product/[id].tsx
import React from 'react';
import Layout from 'components/Layout';
import Slider from "react-slick";
import { GetServerSideProps } from 'next';
import prisma from 'lib/prisma.ts';
import { useCart } from 'pages/context/CartContext';

type ProductProps = {
  product: any;  // Adjust the type as needed
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params;

  // Try fetching as a Book
  let product = await prisma.book.findUnique({
    where: { id: String(id) },
  });

  // If not found, try fetching as Stationery
  if (!product) {
    console.log(product);
    product = await prisma.stationery.findUnique({
      where: { id: String(id) },
    });
  }

  // If still not found, return a 404 error
  if (!product) {
    return {
      notFound: true,
    };
  }

  product.createdAt = product.createdAt.toISOString();
  product.updatedAt = product.updatedAt.toISOString();

  return {
    props: { product },  // will be passed to the page component as props
  };
};

const Product: React.FC<ProductProps> = ({ product }) => {
  const { dispatch } = useCart();  // Move the hook call inside the component

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // ... other settings you need
  };

  const handleAddToCart = () => {
    const itemToAdd = {
      id: product.id,
      name: product.hasOwnProperty('ISBN') ? product.title : product.name,
      price: product.price,
      primaryImageURL: product.primaryImageURL,
      quantity: 1, 
    };

    // Dispatch the 'ADD_ITEM' action
    dispatch({ type: 'ADD_ITEM', payload: itemToAdd });

    // No need to use localStorage here; the cartReducer should handle it
  };

  const allImageURLs = [product.primaryImageURL, ...product.otherImageURLs];

  const isBook = product.hasOwnProperty('ISBN');  

  return (
    <Layout>
      {product && (
        <div className="product-page">
          <div className="image-container">
            <div className="image-slider">
              <Slider {...settings}>
                {allImageURLs.map((url, index) => (
                  <div key={index} className="slide">
                    <img src={url} alt={`Image ${index + 1}`} />
                  </div>
                ))}
              </Slider>
            </div>
            <button onClick={handleAddToCart} className="add-to-cart-button">Add to Cart</button>
          </div>
          <div className="product-info">
            <h1>{isBook ? product.title : product.name}</h1>
            {isBook ? (
              <>
                <p>Author: {product.author}</p>
                <p>ISBN: {product.ISBN}</p>
                <p>Publisher: {product.publisher}</p>
                <p>Published Year: {product.publishedYear}</p>
              </>
            ) : (
              <>
                <p>Brand: {product.brand}</p>
                <p>Category: {product.category}</p>
              </>
            )}
            <p>Price: ${product.price}</p>
            <p>Availability: {product.availability ? 'In Stock' : 'Out of Stock'}</p>
            <p>Description: {product.description}</p>
          </div>
        </div>
      )}
       <style jsx>{`
        .product-page {
          display: flex;
          padding: 2rem;
          flex-direction: row;
          align-items: flex-start;
          max-width: 1200px;
          margin: auto;
          gap: 2rem;
        }
        .image-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .image-slider {
          width: 100%;
          max-width: 600px;
        }
        .slide {
          position: relative;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .slide img {
          width: 100%;
          display: block;
          max-height: 400px;
          object-fit: contain;
        }
        .add-to-cart-button {
          margin-top: 2rem; 
          padding: 0.5rem 1.5rem;
          font-size: 1rem;
          cursor: pointer;
        }
        .product-info {
          width: 100%;
          max-width: 600px;
        }
        @media (max-width: 768px) {
          .product-page {
            flex-direction: column;
          }
          .image-container {
            width: 100%;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Product;