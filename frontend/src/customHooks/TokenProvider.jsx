import React, { createContext, useContext, useState } from "react";

const TokenContext = createContext();
function TokenProvider({ children }) {
  const [token, setToken] = useState("");
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
}

export default TokenProvider;
// eslint-disable-next-line react-refresh/only-export-components
export const useToken = () => useContext(TokenContext);
