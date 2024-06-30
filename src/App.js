import React, { useState, useEffect } from "react";
import RegionLegend from "./components/RegionLegend";
import PopulationBar from "./components/PopulationBar";
import RulerBar from "./components/RulerBar";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [focusYear, setFocusYear] = useState(1950);
  const [focusData, setFocusData] = useState([]);
  const [totalPopulation, setTotalPopulation] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://population-growth-backend.vercel.app/population"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        console.log("jsonData :", jsonData);
        // Transforming the data into an array of objects for each year
        const transformedData = Object.keys(jsonData).map((year) => ({
          year: year,
          data: jsonData[year],
        }));
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFocusData(data[focusYear]);

    const intervalId = setInterval(() => {
      setFocusYear((prevYear) => {
        const nextYear = prevYear + 1;
        if (data[nextYear]) {
          return nextYear;
        } else {
          return 1950; // หรือค่าปีเริ่มต้นที่คุณต้องการ
        }
      });
    }, 1000);

    return () => clearInterval(intervalId); // ทำความสะอาด interval เมื่อ component ถูก unmount
  }, [data, focusYear]);

  useEffect(() => {
    if (focusData && focusData.length > 0) {
      const totalPopulation = focusData.reduce((accumulator, current) => {
        return accumulator + current.population;
      }, 0);

      setTotalPopulation(totalPopulation);
    }
  }, [focusData]);

  return (
    <div className="App" style={{ padding: "2%" }}>
      <h1>Population growth per country, 1950 to 2021</h1>
      <p>Click on the legend below to filter by continent</p>
      <RegionLegend />

      <div style={{ padding: "2%", position: "relative" }}>
        {focusData &&
          focusData
            .slice(0, 12)
            .map((item, index) => (
              <PopulationBar
                item={item}
                maxPopulation={focusData[0].population}
              />
            ))}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 40,
          }}
        >
          <h1 style={{ fontSize: 84, textAlign: "right" }}>{focusYear}</h1>
          <h1 style={{ fontSize: 48 }}>Total: {totalPopulation}</h1>
        </div>
      </div>

      <RulerBar data={data} focusYear={focusYear} />
    </div>
  );
}

export default App;
