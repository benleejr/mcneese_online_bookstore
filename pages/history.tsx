import React from "react";
import Layout from "../components/Layout";

const HistoryPage: React.FC = () => {
  return (
    <Layout>
      <div className="page">
        {/* Header */}
        <header>
          
        </header>

        {/* Main content */}
        <main>
          <section className="History-page">
            <h2>History Books</h2>
            
          </section>
        </main>

        {/* Add your CSS styles here */}
        <style jsx>{`
          /* Add your CSS styles here */
          .History-page {
            /*  */
          }

          

          /* Add more styles as needed */
        `}</style>
      </div>
    </Layout>
  );
};

export default HistoryPage;
