import React, { createContext } from "react";

import { usePersistedState } from "../hooks";

export const YearContext = createContext({});

export const YearProvider = ({ children }) => {
  const date = new Date();
  const academic_year =
    date.getMonth() > 7
      ? `${date.getFullYear()}-${date.getFullYear() + 1}`
      : `${date.getFullYear() - 1}-${date.getFullYear()}`;
  const oneBefore =
    date.getMonth() > 7
      ? `${date.getFullYear() - 1}-${date.getFullYear()}`
      : `${date.getFullYear() - 2}-${date.getFullYear() - 1}`;
  const twoBefore =
    date.getMonth() > 7
      ? `${date.getFullYear() - 2}-${date.getFullYear() - 1}`
      : `${date.getFullYear() - 3}-${date.getFullYear() - 2}`;
  const after =
    date.getMonth() > 7
      ? `${date.getFullYear() + 1}-${date.getFullYear() + 2}`
      : `${date.getFullYear()}-${date.getFullYear() + 1}`;
  const yearList = {
    [twoBefore]: false,
    [oneBefore]: false,
    [academic_year]: true,
    [after]: false,
  };
  const [selectedYear, setSelectedYear] = usePersistedState(
    "@GroupUpYear",
    academic_year
  );

  function changeYear(year) {
    setSelectedYear(year);
  }

  return (
    <YearContext.Provider
      value={{
        changeYear,
        yearList,
        selectedYear,
      }}
    >
      {children}
    </YearContext.Provider>
  );
};
