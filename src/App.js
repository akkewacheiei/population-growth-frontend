import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [focusYear, setFocusYear] = useState(1950);
  const [focusData, setFocusData] = useState([]);

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

  return (
    <div className="App">
      <h1>Population growth per country, 1950 to 2021</h1>
      <p>Click on the legend below to filter by continent</p>
      <div style={{ display: "flex", gap: 5 }}>
        <p>Region</p>
        <>
          <div
            style={{ backgroundColor: "#5A49D9", width: 20, height: 20 }}
          ></div>
          <p>Asia</p>
        </>
        <>
          <div
            style={{ backgroundColor: "#9F96E5", width: 20, height: 20 }}
          ></div>
          <p>Europe</p>
        </>
        <>
          <div
            style={{ backgroundColor: "#CA20A8", width: 20, height: 20 }}
          ></div>
          <p>Africa</p>
        </>
        <>
          <div
            style={{ backgroundColor: "#F3A5E4", width: 20, height: 20 }}
          ></div>
          <p>Oceania</p>
        </>
        <>
          <div
            style={{ backgroundColor: "#F5D638", width: 20, height: 20 }}
          ></div>
          <p>Americas</p>
        </>
      </div>

      <div>
        <h2>{focusYear}</h2>
        <ul>
          {focusData &&
            focusData.slice(0, 12).map((item, index) => (
              <div className="row" style={{ gap: 5 }}>
                <p className="col-1">
                  {item.country_name.split(" ")[1]
                    ? `${item.country_name
                        .split(" ")[0]
                        .charAt(0)}${item.country_name.split(" ")[1].charAt(0)}`
                    : item.country_name}
                </p>
                <div className="col" style={{ display: "flex" }}>
                  <div
                    style={{
                      width: `${
                        (item.population / focusData[0].population) * 100
                      }%`,
                      height: "20px",
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
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
