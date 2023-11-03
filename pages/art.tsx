import React from "react";
import Layout from "../components/Layout";

const ArtPage: React.FC = () => {
  return (
    <Layout>
      <div className="page">
        {/* Header */}
        <header>
          
        </header>

        {/* Main content */}
        <main>
          <section className="Art-page">
            <h2>Art Books</h2>
            
          </section>
        </main>

        {/* Add your CSS styles here */}
        <style jsx>{`
          /* Add your CSS styles here */
          .Art-page {
            /*  */
          }

          

          /* Add more styles as needed */
        `}</style>
      </div>
    </Layout>
  );
};

export default ArtPage;
