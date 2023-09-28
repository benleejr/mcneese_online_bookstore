import React from 'react';

const footerSections = [
  {
    className: 'contact-info',
    content: 'Contact information',
    link: '/contact', // Add the URL for the Contact section
  },
  {
    className: 'about',
    content: 'About section',
    link: '/about', // Add the URL for the About section
  },
  {
    className: 'social-media',
    content: 'Social media links',
    link: '/social-media', // Add the URL for the Social Media section
  },
  {
    className: 'careers',
    content: 'Careers section',
    link: '/careers', // Add the URL for the Careers section
  },
];

const Footer: React.FC = () => {
  return (
    <footer>
      {footerSections.map((section) => (
        <div key={section.className} className={section.className}>
          <a href={section.link}>{section.content}</a>
        </div>
      ))}
    </footer>
  );
};

export default Footer;
