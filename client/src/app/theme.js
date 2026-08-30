export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#E6FBFF",
    100: "#C1F1FF",
    200: "#99E4FE",
    300: "#66D3FD",
    400: "#38C6FD",
    500: "#00BAFC",
    600: "#00A1DB",
    700: "#0088BA",
    800: "#006F99",
    900: "#005A7D",
  },
};

export const themeSettings = (mode) => ({
  palette: {
    mode,
    ...(mode === "dark"
      ? {
          primary: {
            dark: colorTokens.primary[200],
            main: colorTokens.primary[500],
            light: colorTokens.primary[800],
          },
          neutral: {
            dark: colorTokens.grey[100],
            main: colorTokens.grey[200],
            mediumMain: colorTokens.grey[300],
            medium: colorTokens.grey[400],
            light: colorTokens.grey[700],
          },
          background: {
            default: colorTokens.grey[900],
            alt: colorTokens.grey[800],
          },
        }
      : {
          primary: {
            dark: colorTokens.primary[700],
            main: colorTokens.primary[500],
            light: colorTokens.primary[100],
          },
          neutral: {
            dark: colorTokens.grey[700],
            main: colorTokens.grey[500],
            mediumMain: colorTokens.grey[400],
            medium: colorTokens.grey[300],
            light: colorTokens.grey[50],
          },
          background: {
            default: colorTokens.grey[10],
            alt: colorTokens.grey[0],
          },
        }),
  },
  typography: {
    fontFamily: ["Rubik", "sans-serif"].join(","),
    fontSize: 12,
    h1: { fontSize: 40 },
    h2: { fontSize: 32 },
    h3: { fontSize: 24 },
    h4: { fontSize: 20 },
    h5: { fontSize: 16 },
    h6: { fontSize: 14 },
  },
});
