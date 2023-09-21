import React from 'react';

const footerSections = [
  {
    className: 'contact-info',
    content: 'Contact information',
  },
  {
    className: 'about',
    content: 'About section',
  },
  {
    className: 'social-media',
    content: 'Social media links',
  },
  {
    className: 'careers',
    content: 'Careers',
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      {footerSections.map((section) => (
        <div key={section.className} className={section.className}>
          {section.content}
        </div>
      ))}

      <style jsx>{`
        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px; 
          border-top: 1px solid #ccc;
          background-color: #00509E;  // McNeese University's blue
        }
        .contact-info,
        .about,
        .social-media,
        .careers {T
          flex-basis: 24%;
          text-align: center;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
+         color: white;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
