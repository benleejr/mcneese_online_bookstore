import React from "react";
import Layout from "../components/Layout";

const ContactPage: React.FC = () => {
  return (
    <Layout>
      <div className="page">
        {/* Header */}
        <header>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="#">Contact</a></li> {/* Add a link to the Contact page */}
              {/* Add more navigation links as needed */}
            </ul>
          </nav>
        </header>

        {/* Main content */}
        <main>
          <section className="contact-info">
            <h2>Contact Information</h2>
            <address>
              <p>
                Address: 123 Main Street<br />
                City: Your City<br />
                Country: Your Country<br />
                Postal Code: Your Postal Code
              </p>
            </address>
            <p>Email: example@email.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </section>
        </main>

        {/* Add your CSS styles here */}
        <style jsx>{`
          /* Add your CSS styles here */
          .contact-info {
            /* Style for the contact information section */
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
