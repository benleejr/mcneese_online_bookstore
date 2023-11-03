import React, { useState } from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  const [search, setSearch] = useState('');

  return (
    <header className="header">
      <div className="flex-container">
        <div className="left">
          <img src="/logo.png" alt="McNeese Logo" className="logo" />
        </div>
        <div className="center">
          <h1 className='sitename'>Mcneese State University Bookstore</h1>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='searchbar'
          />
          <button className="searchbutton">🔍</button>
        </div>
        <div className="right">
          <a href="shopping-cart">
          <button className="cart-button">🛒</button>
          </a>
          <button className="login-button">Login</button>
        </div>
      </div>
      <nav className="nav-container">
        <ul className="nav-list">
          <li><a href="\">Home</a></li>
          <li><a href="about">About Us</a></li>
          <li className="dropdown">
            Books
            <ul className="dropdown-content">
              <li><a href="science">Science</a></li>
              <li><a href="art">Arts</a></li>
              <li><a href="history">History</a></li>
            </ul>
          </li>
          <li className="dropdown">
            Stationery
            <ul className="dropdown-content">
              <li><a href="pen">Pens</a></li>
              <li><a href="notebooks">Notebooks</a></li>
            </ul>
          </li>
        </ul>
      </nav>
      <style jsx>{`
        .header {
          background-color: #00509E;
          
        }
        .flex-container {
          display: flex;
          justify-content: space-between;
          padding: 1rem;
          align-items: center;
        }
        .left .logo {
          height: 50px;
        }
        .center {
          flex-grow: 2;
          display: flex;
        }
        .center input {
          flex-grow: 1;
          padding: 0.5rem;
        }
        .right .cart-button, .right .login-button {
          background-color: white;
          border: none;
          cursor: pointer;
          font-size: 1.5rem;
          margin-left: 15px;
          background-clip: padding-box;
          margin-top:40px;
        }
        .right .login-button {
          font-size: 1rem;
        }
        .nav-container {
          display: flex;
          justify-content: center;
          background-color: #003366;
        }        
        .nav-list {
          display: flex;
          list-style-type: none;
          margin: 0;
          padding: 0;
          justify-content: space-between;
          font-size: 1.5rem;
          color: white;
          width: 90%;
          margin-left: auto;
          margin-right: auto;
        }
        .nav-list li {
          position: relative;
          color: white;
        }
        .dropdown-content {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          background-color: white;
          z-index: 1;
        }
        .dropdown:hover .dropdown-content {
          display: flex;
          flex-direction: column;
        }
        .sitename{
          color: white;
          text-border: black;
          -webkit-text-stroke-width: 2px;
          -webkit-text-stroke-color: black;
          padding-right:10px;
          padding-left:10px;
          
        }
        .searchbar   {
          margin-top:40px;
          background-clip: padding-box;
          
        
        }
        .searchbutton {
          margin-top:40px;
          background-clip: padding-box;
          
        }
        

      `}</style>
    </header>
  );
};

export default Header;
