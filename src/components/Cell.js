import React from 'react';

function Cell({ status, onClick }) {
  return (
    <div
      className={`cell ${status}`}
      onClick={onClick}
    />
  );
}

export default Cell;
