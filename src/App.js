import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);

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
        setData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Population Data</h1>
      {data.map((yearData, index) => (
        <div key={index}>
          <h2>{yearData.year}</h2>
          <ul>
            {yearData.data.map((item, index) => (
              <li key={index}>
                <p>Country: {item.country_name}</p>
                <p>Population: {item.population}</p>
                <p>Region: {item.region}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
