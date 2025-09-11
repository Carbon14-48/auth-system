import React, { createContext, useContext, useState } from "react";
const IdContext = createContext();
function IdProvider({ children }) {
  const [id, setId] = useState();
  return (
    <IdContext.Provider value={{ id, setId }}>{children}</IdContext.Provider>
  );
}

export default IdProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useId = () => useContext(IdContext);
