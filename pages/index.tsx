// pages/index.tsx
import React from 'react';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import prisma from '../lib/prisma';
import Slider from "react-slick";
import PrevArrow from '../components/PrevArrow';
import NextArrow from '../components/NextArrow';
import Link from 'next/link';

type Props = {
  randomBooks: {
    id: string;
    title: string;
    author: string;
    ISBN: string;
    category: string;
    price: number;
    language: string;
    availability: boolean;
    primaryImageURL: string;
    otherImageURLs: string[];
    description: string;
    publisher: string;
    publishedYear: number;
    stock: number;
    createdAt: string;
    updatedAt: string;
  }[];
  randomStationery: {
    id: string;
    name: string;
    category: string;
    price: number;
    availability: boolean;
    primaryImageURL: string;
    otherImageURLs: string[];
    description: string;
    stock: number;
    createdAt: string;
    updatedAt: string;
  }[];
};

export const getStaticProps: GetStaticProps = async () => {

  let randomBooks = await prisma.book.findMany({
    take: 2,
    orderBy: {
      id: 'asc',  
    },
  });

  let randomStationery = await prisma.stationery.findMany({
    take: 2,
    orderBy: {
      id: 'asc',  
    },
  });

  // @ts-ignore
  randomBooks = randomBooks.map((book) => ({
    ...book,
    createdAt: book.createdAt.toISOString(),
    updatedAt: book.updatedAt.toISOString(),
  }));

  // @ts-ignore
  randomStationery = randomStationery.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }));

  return {
    props: { randomBooks, randomStationery },
    revalidate: 10,
  };
};

const Index: React.FC<Props> = (props) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />
  };

  return (
    <Layout>
      <div className="page">
        <div className="slider-container">
        <Slider {...settings}>
          <div>
            <img src="/mcneese_bookstore_banner.png" alt="Banner 1" className="banner" />
          </div>
          <div>
            <img src="/Banner2.png" alt="Banner 2" className="banner" />
          </div>
          <div>
            <img src="/Banner3.png" alt="Banner 3" className="banner" />
          </div>
        </Slider>
        </div>
        <main>
        <div className="grid-container">
          {props.randomBooks && props.randomBooks.map((book, index) => (
            <div key={index} className="grid-item">
              <Link href={`product/${book.id}`}>
                  <img src={book.primaryImageURL} alt={book.title} style={{ cursor: 'pointer' }} />
              </Link>
            </div>
          ))}
          {props.randomStationery && props.randomStationery.map((item, index) => (
            <div key={index} className="grid-item">
              <Link href={`product/${item.id}`}>
                  <img src={item.primaryImageURL} alt={item.name} style={{ cursor: 'pointer' }} />
              </Link>
            </div>
          ))}
        </div>
      </main>
      </div>
      <style jsx>{`
        .slider-container {
          position: relative;
          max-width: 100%;
          margin: 0 auto;  // Adjust as needed to center the slider on the page
        }
        {/* Grid Adjustments */}
        .grid-container {
          display: flex;
          justify-content: space-between;
          margin: 1rem 0;  // Adds some margin around the grid
        }
      
        .grid-item {
          width: 20%;  // Sets a width for the grid items
          text-align: center;  // Centers the text and images within the grid items
        }
      
        .grid-item img {
          max-width: 100%;  // Ensures the images don't exceed the grid item width
          max-height: 400px;  // Sets a maximum height for the images
          display: block;  // Makes sure the images are block-level elements
          margin: 0 auto;  // Centers the images within the grid items
        }
        .banner {
          width: 100%;
          height: auto;
        }
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
      <style jsx global>{`
      body {
        overflow-x: hidden;  // hides horizontal scrollbar
      }
        .slick-slide {
           display: inline-block;
        }
        .slick-slide img {
          margin: auto;
          border: 0;
          display: block;
          width: 100%;
        }
        .slick-dots {
          bottom: -30px;
        }
        .slick-prev, 
        .slick-next {
          z-index: 1;
        }
      `}</style>
    </Layout>
  );
};

export default Index;