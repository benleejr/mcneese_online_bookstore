import React, { ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div className="container">
    <Header />
    
    <div className="layout">{props.children}</div>
    <style jsx global>{`
      html {
        box-sizing: border-box;
      }

      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }

      body {
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
          "Segoe UI Symbol";
        background: rgba(0, 0, 0, 0.05);
      }

      input,
      textarea {
        font-size: 16px;
      }

      button {
        cursor: pointer;
      }
    `}</style>
    <style jsx>{`
      .container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }
      .layout {
        flex: 1;
        padding: 0 2rem;
      }
    `}</style>

    <Footer/>
    
  </div>
);

export default Layout;
