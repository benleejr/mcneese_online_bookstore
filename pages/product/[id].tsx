// pages/product/[id].tsx
import React from 'react';
import Layout from 'components/Layout';
import Slider from "react-slick";
import { GetServerSideProps } from 'next';
import prisma from 'lib/prisma.ts';

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
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    
  };

  const allImageURLs = [product.primaryImageURL, ...product.otherImageURLs];

  const isBook = product.hasOwnProperty('ISBN');  

  return (
    <Layout>
      {product && (
        <div className="product-page">
          <div className="image-slider">
            <Slider {...settings}>
              {allImageURLs.map((url, index) => (
                <div key={index} className="slide">
                  <img src={url} alt={`Image ${index + 1}`} />
                </div>
              ))}
            </Slider>
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
          flex-direction: column;
          align-items: center;
          max-width: 1200px;
          margin: auto;
        }
        .image-slider {
          width: 100%;
          max-width: 600px;
          margin-bottom: 2rem;
        }
        .slide {
          position: relative;
          overflow: hidden;
        }
        .slide img {
          width: 100%;
          display: block;
          max-height: 400px;
          object-fit: cover;
        }
        .product-info {
          width: 100%;
          max-width: 600px;
        }
      `}</style>
    </Layout>
  );
};

export default Product;