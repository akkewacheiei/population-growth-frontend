import React from "react";

const PopulationBar = ({ item, maxPopulation }) => {
  return (
    <div className="row" style={{ gap: 5 }}>
      <p className="col-1">
        {item.country_name.split(" ")[1]
          ? `${item.country_name.split(" ")[0].charAt(0)}${item.country_name
              .split(" ")[1]
              .charAt(0)}`
          : item.country_name}
      </p>
      <div className="col" style={{ display: "flex" }}>
        <div
          style={{
            width: `${(item.population / maxPopulation) * 100}%`,
            height: "30px",
            backgroundColor:
              item.region === "Asia"
                ? "#5A49D9"
                : item.region === "Europe"
                ? "#9F96E5"
                : item.region === "Africa"
                ? "#CA20A8"
                : item.region === "Oceania"
                ? "#F3A5E4"
                : "#F5D638",
          }}
        />
        <p>{item.population}</p>
      </div>
    </div>
  );
};

export default PopulationBar;
