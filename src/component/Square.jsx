import React from 'react';

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value.revealed || value.matched ? value.value:''}

    </button>
  );
};

export default Square;
