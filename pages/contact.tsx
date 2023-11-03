import React from "react";
import Layout from "../components/Layout";

const ContactPage: React.FC = () => {
  return (
    <Layout>
      <div className="page">
        {/* Header */}
        <header>
          
        </header>

        {/* Main content */}
        <main>
          <section className="contact-info">
            <h2>Contact Information</h2>
            <address>
              <p>
                Address: McNeese Street<br />
                City: Lake Charles<br />
                Country: United States<br />
                Postal Code: 70607
              </p>
            </address>
            <p>Email: bookstore@mcneese.edu.</p>
            <p>Phone: +1 (337) 475-5494</p>
          </section>
        </main>

        {/* Add your CSS styles here */}
        <style jsx>{`
          /* Add your CSS styles here */
          .contact-info {
            /* Style for the contact information section */
            background-color: #f7f7f7;
            padding: 5px;
            border-radius: 5px;
            border-style: solid;
            border-color: #00509E;
            text-align: center;
            width: 20%;
            margin:auto;
            
            
            
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

export default ContactPage;
