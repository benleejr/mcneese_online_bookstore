import React from "react";
import Layout from "../components/Layout";
import { GetServerSideProps } from 'next';
import { PrismaClient } from '@prisma/client';
import Post, { PostProps } from "../components/Post";

export const getServerSideProps: GetServerSideProps = async () => {
  const prisma = new PrismaClient();

  const books = await prisma.book.findMany();

  // Close the database connection
  await prisma.$disconnect();

  return {
    props: {
      books: books.map((book) => ({
        title: book.title,
        author: book.author,
        content: '', // you can add more fields as needed
      })),
    },
  };
};

interface BlogProps {
  books: PostProps[];
}

const Blog: React.FC<BlogProps> = ({ books }) => {
  return (
    <Layout>
      <div className="page">
        {/* Header */}
        <header className="header">
          <nav>
            <ul className="nav-list">
              {/* ... */}
            </ul>
          </nav>
        </header>
        {/* Body */}
        <main className="main-content">
          <section className="new-releases">
            {books.map((book, index) => (
              <div key={index} className="post">
                <Post post={book} />
                <p>Test</p>
              </div>
            ))}
          </section>
        </main>

        {/* Styles */}
        <style jsx>{`
          .page {
            margin: auto;
            max-width: 1200px;
            padding: 20px;
          }
          .header {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px 0;
          }
          .nav-list {
            display: flex;
            gap: 20px;
          }
          .main-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }
          .new-releases {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
          }
          .post {
            border: 1px solid #ddd;
            padding: 20px;
            border-radius: 8px;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default Blog;
