import React, { useState } from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";

// Sample data for different genres/categories (replace with actual data)
const genresData: Record<string, PostProps[]> = {
  fiction: [
    {
      id: '1',
      title: "Fiction Book 1",
      author: "Author 1",
      content: "Lorem ipsum...",
    },
    // Add more fiction books as needed
  ],
  nonfiction: [
    {
      id: '2',
      title: "Nonfiction Book 1",
      author: "Author 1",
      content: "Lorem ipsum...",
    },
    // Add more nonfiction books as needed
  ],
  // Add more genres/categories with their respective data
};

const Blog: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>("fiction");

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
  };

  const currentGenreData = genresData[selectedGenre] || [];

  return (
    <Layout>
      <div className="page">
        {/* Header */}
        <header>
          <nav>
            <ul>
              <li><a href="#">Books</a></li>
              <li><a href="#">Stationery</a></li>
              {/* Add more navigation links as needed */}
            </ul>
          </nav>
        </header>

        {/* Body */}
        <main>
          <section className="banner">
            {/* Scrolling banner content */}
          </section>
          <section className="genre-selection">
            {/* Genre selection buttons */}
            <button onClick={() => handleGenreChange("fiction")}>Fiction</button>
            <button onClick={() => handleGenreChange("nonfiction")}>Nonfiction</button>
            {/* Add more genre buttons as needed */}
          </section>
          <section className="genre-content">
            <h2>{selectedGenre.charAt(0).toUpperCase() + selectedGenre.slice(1)}</h2>
            <div className="genre-books">
              {currentGenreData.map((post) => (
                <div key={post.id} className="book">
                  <h3>{post.title}</h3>
                  <p>Author: {post.author}</p>
                  {/* You can add content here */}
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Add your CSS styles here */}
        <style jsx>{`
          /* Add your CSS styles here */
          .genre-selection {
            /* Style for the genre selection buttons */
          }
          
          .genre-content {
            /* Style for the genre content section */
          }

          .genre-books {
            /* Style for individual books in the genre */
          }

          /* Add more styles as needed */
        `}</style>
      </div>
    </Layout>
  );
};
 
export default Blog;
