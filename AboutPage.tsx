// components/AboutPage.tsx

import React from 'react';
import Layout from './Layout';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <div className="page">
        {/* Header */}
        <header>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="#">About</a></li> {/* Add a link to the About page */}
              {/* Add more navigation links as needed */}
            </ul>
          </nav>
        </header>

        {/* Body */}
        <main>
          <section className="about-section">
            <h2>About Us</h2>
            <p>
              Welcome to our bookstore! Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              We are passionate about books and have been serving book lovers for many years.
              Here, you'll find a wide selection of books in various genres.
            </p>
          </section>
        </main>

        {/* Add your CSS styles here */}
        <style jsx>{`
          /* Add your CSS styles here */
          .about-section {
            background-color: #f7f7f7;
            padding: 20px;
            border-radius: 5px;
          }

          .about-section h2 {
            font-size: 24px;
          }

          .about-section p {
            font-size: 16px;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default AboutPage;
