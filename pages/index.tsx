// pages/index.tsx
import React from 'react';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import Post, {PostProps} from '../components/Post';
import prisma from '../lib/prisma'; // Assuming you have a file named prisma.ts that exports your Prisma client

// Function to get the feed from the database
const getFeedFromDatabase = async () => {
  const feed = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      id: 'desc',
    },
  });

  return feed;
};

// Static generation for the feed
export const getStaticProps: GetStaticProps = async () => {
  const feed = await getFeedFromDatabase();
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: PostProps[];
};

const Index: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>McNeese Bookstore</h1>
        <main>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
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
    </Layout>
  );
};

export default Index;
