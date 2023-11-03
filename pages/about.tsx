// components/AboutPage.tsx

import React from 'react';
import Layout from '../components/Layout';

const About: React.FC = () => {
  return (
    <Layout>
      <div className="page">
        {/* Header */}
        <header>
          
        </header>

        {/* Body */}
        <main>
          <section className="about-section">
            <h2>About Us</h2>
            
            <p style={{ fontSize: '20px' }}>Visit the McNeese Bookstore</p>

            
            <p>Find us on Facebook! <a href = "https://www.facebook.com/McNeese-Bookstore-161892853828362">https://www.facebook.com/McNeese-Bookstore-161892853828362 </a></p>
            <p>The McNeese University Bookstore is owned and operated by McNeese State University.</p>
            <p>

            Textbooks can be purchased in person or online at <a href= "mcneesecowboystore.com">mcneesecowboystore.com</a>
            <hr></hr>
            <div className ="callQuestion">
            <ul>

            <li>For answers to questions about online orders, call (337) 475-5360.</li>  

            <li>For answers to questions about textbooks, including Redshelf materials, call (337) 475-5489 or (337) 475-5491 
            or email <a href= "bookstore@mcneese.edu">bookstore@mcneese.edu</a>.</li>

            <li>For answers to questions about Accounts Payable, call (337) 475-4295, or (337) 475-5361, or (337) 475-5490.</li>
            </ul>
            </div>
            <p>Regular business hours are 7:30 a.m. to 5:00 p.m., Monday through Thursday and 7:30 a.m. to 11:30 a.m. on Friday. <br/> 
            <b>During the first week of each fall and spring semester, the Bookstore is open late to better serve all students.</b></p>

            <p>Employee business card orders are placed through the McNeese employee portal.  
            If you have any questions about business card orders, please call (337) 475-5361 for assistance.</p>

            <p>
            <b>The McNeese Bookstore does not accept business card orders by fax.</b></p>
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
            border-style: solid;
            border-color: #00509E;
            
          }

          .about-section h2 {
            font-size: 24px;
            text-align:center;
          }

          .about-section p {
            font-size: 16px;
            text-align: center;
          }
          
          .callQuestion ul li {
            font-size: 12px;
            text-align: center;
            list-style-position: inside;
          }
          .ul{
            padding-left: 0;
          }



        `}</style>
      </div>
    </Layout>
  );
};

export default About;
