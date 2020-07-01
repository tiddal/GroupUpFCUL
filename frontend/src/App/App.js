import React from "react";
import GlobalStyles from "../styles/global";
import { AuthProvider } from "../contexts/auth";
import { CustomThemeProvider } from "../contexts/theme";

import Routes from "../routes";
import { YearProvider } from "../contexts/year";

function App() {
  return (
    <CustomThemeProvider>
      <AuthProvider>
        <YearProvider>
          <GlobalStyles />
          <Routes />
        </YearProvider>
      </AuthProvider>
    </CustomThemeProvider>
  );
}

export default App;
