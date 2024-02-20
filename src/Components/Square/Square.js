import React from "react";

const Square = ({ value, onHandleClick }) => {
  return (
    <>
      <button
        className={`square ${
          (value === "X" && "x-mark") || (value === "O" && "o-mark")
        }`}
        onClick={onHandleClick}
      >
        {value}
      </button>
    </>
  );
};

export default Square;
