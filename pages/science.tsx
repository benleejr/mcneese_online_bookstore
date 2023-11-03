import React from "react";
import Layout from "../components/Layout";

const Sciencebooks: React.FC = () => {
  return (
    <Layout>
      <div className="page">
        {/* Header */}
        <header>
          
        </header>

        {/* Main content */}
        <main>
          <section className="Science-page">
            <h2>Science Books</h2>
            
          </section>
        </main>

        {/* Add your CSS styles here */}
        <style jsx>{`
          /* Add your CSS styles here */
          .Science-page {
            /*  */
          }

          .contact-info address {
            /* Style for the address block */
          }

          /* Add more styles as needed */
        `}</style>
      </div>
    </Layout>
  );
};

export default Sciencebooks;
