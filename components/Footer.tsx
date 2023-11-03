import React, { CSSProperties } from 'react';

const footerSections = [
  {
    className: 'contact-info',
    content: 'Contact information',
    link: '/contact',
  },
  {
    className: 'about',
    content: 'About section',
    link: '/about',
  },
  {
    className: 'facebook',
    content: 'Our Facebook',
    link: 'https://www.facebook.com/McNeese-Bookstore-161892853828362',
  },
  {
    className: 'careers',
    content: 'Careers section',
    link: '/careers',
  },
];

const Footer: React.FC = () => {
  const footerStyle: CSSProperties = {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#00509E',
    color: 'white',
    padding: '20px',
  };

  const columnStyle: CSSProperties = {
    flex: '1',
    textAlign: 'center',
  };

  const linkStyle = {
    color: 'white', // Text color for links is set to white
    textDecoration: 'none', // Remove underline from links
    fontSize: '20px',
    
  };

  return (
    <footer style={footerStyle}>
      {footerSections.map((section) => (
        <div key={section.className} className={`column ${section.className}`} style={columnStyle}>
          <a href={section.link} style={linkStyle}>{section.content}</a>
        </div>
      ))}
    </footer>
  );
};

export default Footer;
