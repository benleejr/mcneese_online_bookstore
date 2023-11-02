// components/NextArrow.tsx
import React from 'react';

const NextArrow: React.FC<any> = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      style={{ ...style, right: 0, zIndex: 1, opacity: 0.5, position: 'absolute', top: 0, bottom: 0, width: '100px', border: 'none', backgroundColor: 'transparent' }}
      onClick={onClick}
    >
      {'>'}
    </button>
  );
};

export default NextArrow;