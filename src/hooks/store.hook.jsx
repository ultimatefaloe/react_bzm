import { use, useEffect, useState } from "react";

export const useStore = ()=> ({
  getData: (key) => {
    const [data, setData] = useState(null);

    useEffect(() => {
      const storedData = localStorage.getItem(key);
      if (storedData) {
        setData(JSON.parse(storedData));
      } else {
        setData(null);
      }
    }, [key]);

    return data;
  },

  setData: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
    getData(key);
  },

  updateData: (key, value) => {
    let newData;
    const existingData = localStorage.getItem(key);
    // const newData = existingData ? { ...JSON.parse(existingData), ...value } : value;
    if (existingData) {
      newData = { ...JSON.parse(existingData), ...value };
    }
    localStorage.setItem(key, JSON.stringify(newData));

    getData(key);
  },

  removeData: (key) => {
    localStorage.removeItem(key);
    getData(key);
  },

  clearData: () => {
    localStorage.clear();
    getData(key);
  }
});