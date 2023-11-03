import React from "react";
import Layout from "../components/Layout";

const PenPage: React.FC = () => {
  return (
    <Layout>
      <div className="page">
        {/* Header */}
        <header>
          
        </header>

        {/* Main content */}
        <main>
          <section className="Pen-page">
            <h2>Pens</h2>
            
          </section>
        </main>

        {/* Add your CSS styles here */}
        <style jsx>{`
          /* Add your CSS styles here */
          .Pen-page {
            /*  */
          }

          

          /* Add more styles as needed */
        `}</style>
      </div>
    </Layout>
  );
};

export default PenPage;
