"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { server } from "@/app/_api/api";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const foodCategoryGet = async () => {
    try {
      const response = await server.get("/foodCategory/get");
      setData(response.data.category);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  use Effect(() => {
    foodCategoryGet();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        data,
        loading,
        foodCategoryGet,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
