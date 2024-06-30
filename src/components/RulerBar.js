import React from "react";

const RulerBar = ({ data, focusYear }) => {
  return (
    <div
      className="ruler"
      style={{
        borderTop: "1px solid black",
        width: "100%",
        height: 20,
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      {Object.keys(data).map((item, index) => (
        <div
          key={index}
          className="ruler-mark"
          style={{
            flexGrow: 1,
            borderLeft: "1px solid black",
            position: "relative", // Add relative positioning to the parent container
          }}
        >
          <span
            style={{
              position: "absolute",
              bottom: -20, // Adjust this value as needed
              left: 0,
              transform: "translateX(-50%)",
            }}
          >
            {index % 4 === 0 ? item : ""}
          </span>

          <span
            style={{
              fontSize: 20,
              position: "absolute",
              top: -25, // Adjust this value as needed
              left: 0,
              transform: "translateX(-50%)",
            }}
          >
            {focusYear == item ? "▼" : ""}
          </span>
        </div>
      ))}
    </div>
  );
};

export default RulerBar;
