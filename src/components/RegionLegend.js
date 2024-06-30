import React from "react";

const RegionLegend = () => {
  return (
    <div style={{ display: "flex", gap: 5 }}>
      <p>Region</p>
      <>
        <div style={{ backgroundColor: "#5A49D9", width: 20, height: 20 }}></div>
        <p>Asia</p>
      </>
      <>
        <div style={{ backgroundColor: "#9F96E5", width: 20, height: 20 }}></div>
        <p>Europe</p>
      </>
      <>
        <div style={{ backgroundColor: "#CA20A8", width: 20, height: 20 }}></div>
        <p>Africa</p>
      </>
      <>
        <div style={{ backgroundColor: "#F3A5E4", width: 20, height: 20 }}></div>
        <p>Oceania</p>
      </>
      <>
        <div style={{ backgroundColor: "#F5D638", width: 20, height: 20 }}></div>
        <p>Americas</p>
      </>
    </div>
  );
};

export default RegionLegend;
