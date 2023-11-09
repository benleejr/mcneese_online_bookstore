import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useSession } from 'next-auth/react';
import axios, {isCancel, AxiosError} from 'axios';

const Header: React.FC = () => {
  const [search, setSearch] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const { data: session } = useSession();

  const handleSearch = () => {
    if (search.trim()) {
      Router.push(`/Results?search=${encodeURIComponent(search.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    console.log(session);
    if (session?.user?.email) {
      axios.get('/api/user', { params: { email: session.user.email } })
        .then(response => {
          console.log(response.data);
          const user = response.data;
          setIsAdmin(user?.isAdmin ?? false);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [session]);

  return (
    <header className="header">
      <div className="flex-container">
        <div className="left" onClick={() => Router.push('/')}>
          <Link href="/">
            <img src="/logo.svg" alt="McNeese Logo" className="logo" />
          </Link>
        </div>
        <div className="center">
        <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button>🔍</button>
        </div>
        <div className="right">
          <Link href="/ShoppingCart">            
              <button className="cart-button">🛒</button>            
          </Link>
          {session ? (
            <div className="dropdown">
              <button className="login-button">Profile</button>
              <ul className="dropdown-content">
                <li>
                  <Link href="/profile">Profile</Link>
                </li>
                {isAdmin && (
                  <li>
                    <Link href="/Add">Add New Store Items</Link>
                  </li>
                )}
                <li>
                  <Link href="/api/auth/signout">Logout</Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link href="/api/auth/signin">
              <button className="login-button">Login</button>
            </Link>
          )}
        </div>
      </div>
      <nav className="nav-container">
        <ul className="nav-list">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About Us</a></li>
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
          text-decoration: none;
        }
        
        .nav-list a {
          text-decoration: none;  // This line removes the underline
        }

        .nav-list li {
          position: relative;          
          text-decoration: none;
        }

        .nav-list a:visited {
          color: white;  // Or any color you wish
        }

        .dropdown-content, .dropdown-content li {
          margin: 0;
          padding: 0;
        }
        .dropdown {
          position: relative;
          display: inline-block; /* Ensures that the dropdown is only as wide as its trigger */
        }        
        .dropdown-content {
          list-style-type: none;
          display: none;
          position: absolute;
          top: calc(100% - 1px);
          left: 0;
          background-color: white;
          z-index: 1000; /* Higher value to ensure it appears above other elements */
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); /* Optional: Adds a shadow for better distinction */
          border: 1px solid #ccc; /* Optional: Adds a border */
        }        
        .dropdown:hover .dropdown-content {
          display: block; /* Changed from flex to block for default stacking of list items */
        }
        
      `}</style>
    </header>
  );
};

export default Header;
