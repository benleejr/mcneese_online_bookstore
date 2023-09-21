//Header.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

const Header: React.FC = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const { data: session, status } = useSession();

  const navList = (
    <div className="nav-container">
      <ul className="nav-list">
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>About Us</a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </li>
        <li className="dropdown">
          Books
          <ul className="dropdown-content">
            <li><Link href="/books?category=Science"><a>Science</a></Link></li>
            <li><Link href="/books?category=Arts"><a>Arts</a></Link></li>
            <li><Link href="/books?category=History"><a>History</a></Link></li>
            {/* Add more categories as needed */}
          </ul>
        </li>
        <li>
          Stationery
          <ul className="dropdown-content">
            <li><Link href="/stationery?category=Pens"><a>Pens</a></Link></li>
            <li><Link href="/stationery?category=Notebooks"><a>Notebooks</a></Link></li>
            {/* Add more categories as needed */}
          </ul>
        </li>
      </ul>
    </div>
  );

  const left = (
    <div className="left">
      <img src="/logo.png" alt="McNeese Bookstore" className="logo" />
      <style jsx>{`
        .logo {
          height: 50px;
          flex-grow: 1;
        }
      `}</style>
    </div>
  );

  const center = (
    <div className="center">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="search-button">🔍</button>
      <style jsx>{`
        .center {
          display: flex;
          flex-grow: 2;
        }
        input {
          flex-grow: 1;
          padding: 0.5rem;
          border: 1px solid var(--geist-foreground);
          border-radius: 3px;
        }
        .search-button {
          background-color: #ffffff;
          border: 1px solid var(--geist-foreground);
          border-radius: 3px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );

  const right = (
    <div className="right">
      <button className="cart-button">🛒</button>
      <button className="login-button">Login</button>
      <style jsx>{`
        .cart-button, .login-button {
          background-color: #ffffff;
          border: none;
          cursor: pointer;
          font-size: 1.5rem;
          margin-left: 20px;  // Adding margin to space it from the search icon
        }
        .login-button {
          font-size: 1rem;
        }
      `}</style>
    </div>
  );

  return (
    <header className="header">
      <div className="flex-container">
        {left}
        {center}
        {right}
      </div>
      <nav className="main-nav">
        {navList}
      </nav>
      <style jsx>{`
        .header {
          background-color: #00509E;
        }
        .flex-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
        }
        .nav-container {
          display: flex;
          justify-content: space-evenly;
          background-color: #003366;
          padding: 0.5rem 0;
        }
        .nav-list {
          display: flex;
          list-style-type: none;
          padding: 0;
          margin: 0;
          justify-content: flex-end;  // This line
        }
        .nav-list li {
          margin: 0 15px;
        }
        .dropdown-content {
          display: none;
          opacity: 0;
          transition: opacity 0.3s ease;  // Animation here
        }
        .dropdown:hover .dropdown-content {
          display: block;
          opacity: 1;  // Animation here
        }
      `}</style>
    </header>
  );
};

export default Header;
