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
    content: 'Careers section',
  },
];

const Footer: React.FC = () => {
  return (
    <footer>
      {footerSections.map((section) => (
        <div key={section.className} className={section.className}>
          {section.content}
        </div>
      ))}
    </footer>
  );
};

export default Footer;
