import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";

const FAQPage: React.FC = () => {
  return (
    <Layout>
      <div className="page">
        {/* Header */}
        <header>
          <nav>
            <ul>
              <li><a href="#">Home</a></li>
              {/* Add more navigation links as needed */}
            </ul>
          </nav>
        </header>

        {/* Main content */}
        <main>
          <section className="faq">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-items">
              <div className="faq-item">
                <h3>Question 1</h3>
                <p>Answer to question 1...</p>
              </div>
              <div className="faq-item">
                <h3>Question 2</h3>
                <p>Answer to question 2...</p>
              </div>
              {/* Add more FAQ items as needed */}
            </div>
          </section>
        </main>

        {/* Add your CSS styles here */}
        <style jsx>{`
          /* Add your CSS styles here */
          .faq {
            /* Style for the FAQ section */
          }
          
          .faq-items {
            /* Style for individual FAQ items */
          }

          .faq-item h3 {
            /* Style for FAQ item question */
          }

          .faq-item p {
            /* Style for FAQ item answer */
          }
        `}</style>
      </div>
    </Layout>
  );
};
 
export default FAQPage;