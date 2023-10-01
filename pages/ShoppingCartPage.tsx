import React from "react";
import Layout from "../components/Layout";

const ShoppingCartPage: React.FC = () => {
  return (
    <Layout>
      <div className="page">
        
        <header>
          <nav>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Products</a></li>
              
            </ul>
          </nav>
        </header>

        {/* Main content */}
        <main>
          <section className="shopping-cart">
            <h2>Shopping Cart</h2>
            
          </section>
        </main>

        <style jsx>{`
          /* Add your CSS styles here */
          .shopping-cart {
            /* Style for the shopping cart section */
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default ShoppingCartPage;
