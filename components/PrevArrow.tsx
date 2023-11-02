import React from 'react';

const PrevArrow: React.FC<any> = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      style={{ 
        ...style, 
        left: 0, 
        zIndex: 1, 
        opacity: 0.5, 
        position: 'absolute', 
        top: '50%', 
        transform: 'translateY(-50%)', 
        width: '100px', 
        border: 'none', 
        backgroundColor: 'transparent' 
      }}
      onClick={onClick}
    >
      {'<'}
    </button>
  );
};

export default PrevArrow;