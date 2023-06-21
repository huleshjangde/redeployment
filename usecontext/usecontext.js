import React, { createContext, useState, useEffect } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const jsonData = await response.json();
      setApiData(jsonData.slice(0, 10));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };




  return (
    <AppContext.Provider value={apiData}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
