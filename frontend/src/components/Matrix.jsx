import React, { useState } from "react";

function Matrix() {
  const [colors, setColors] = useState(Array(9).fill("white"));
  const [clickedBoxes, setClickedBoxes] = useState([]);

  function handleBoxClick(index) {
    const newColors = [...colors];
    newColors[index] = "green";
    setColors(newColors);

    setClickedBoxes([...clickedBoxes, index]);

    if (index === 8) {
      changeToOrange();
    }
  }

  function changeToOrange() {
    clickedBoxes.forEach((boxIndex, i) => {
      setTimeout(() => {
        setColors((prevColors) => {
          const newColors = [...prevColors];
          newColors[boxIndex] = "orange";
          return newColors;
        });
      }, i * 300);
    });
  }

  const resetBoxes = () => {
    setColors(Array(9).fill("white"));
    setClickedBoxes([]);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gap: "5px",
        }}
      >
        {colors.map((color, index) => (
          <div
            key={index}
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: color,
              border: "1px solid black",
              cursor: "pointer",
            }}
            onClick={() => handleBoxClick(index)}
          />
        ))}
      </div>
      <button
        style={{
          backgroundColor: "tomato",
          marginTop: "10px",
          padding: "5px",
          borderRadius: "4px",
          width: "100px",
          border: "none",
        }}
        onClick={resetBoxes}
      >
        Reset
      </button>
    </div>
  );
}

export default Matrix;
