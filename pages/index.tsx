import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";

// Sample data for the "New Releases" section (replace with actual data)
const newReleases: PostProps[] = [
  {
    id: 1,
    title: "New Book 1",
    author: "Author 1",
    content: "Lorem ipsum...",
  },
  {
    id: 2,
    title: "New Book 2",
    author: "Author 2",
    content: "Lorem ipsum...",
  },
];

const Blog: React.FC = () => {
  return (
    <Layout>
      <div className="page">
        {/* Header */}
        <header>
          <nav>
            <ul>
              <li><a href="#">Books</a></li>
              <li><a href="#">Stationery</a></li>
              <li><a href="#">Fiction</a></li>
              <li><a href="#">Nonfiction</a></li>
              <li><a href="#">Subjects</a></li>
            </ul>
          </nav>
          
          
          
        </header>

        {/* Body */}
        <main>
          <section className="banner">
            {/* Scrolling banner content */}
          </section>
          <section className="new-releases">
            <h2>New Releases</h2>
            <div className="new-release-books">
              {newReleases.map((post) => (
                <div key={post.id} className="book">
                  <h3>{post.title}</h3>
                  <p>Author: {post.author}</p>
                  {/* You can add content here */}
                </div>
              ))}
            </div>
          </section>
          <section className="product-categories">
            {/* Product listings by categories */}
          </section>
        </main>

        
       

        <style jsx>{`
          /* Add your CSS styles here */
        `}</style>
      </div>
    </Layout>
  );
};

export default Blog;
