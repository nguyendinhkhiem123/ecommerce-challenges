/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");
const screens = {
  phone: "600px",
  laptop: "1024px",
  desktop: "1270px",
  television: "1600px",
};

const colors = {
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",
  current: "currentColor",
  // Primary
  primary: {
    50: "#fffeeb",
    100: "#f7ecce",
    200: "#fdf68a",
    300: "#fceb4d",
    400: "#fbdc24",
    500: "#f5bf0f",
    600: "#d99406",
    700: "#b46a09",
    800: "#92520e",
    900: "#78430f",
  },
  gray: {
    50: "#f8f9fa",
    100: "#eceff2",
    200: "#d6dce1",
    300: "#b2bec7",
    400: "#889ba8",
    500: "#697e8e",
    600: "#546775",
    700: "#45535f",
    800: "#3c4750",
    900: "#363d45",
  },
  blue: {
    50: "#eff4ff",
    100: "#dbe6fe",
    200: "#bfd3fe",
    300: "#93b4fd",
    400: "#6090fa",
    500: "#3b76f6",
    600: "#2563eb",
    700: "#1d58d8",
    800: "#1e4baf",
    900: "#1e408a",
  },

  yellow: {
    50: "#fefaec",
    100: "#fbf2ca",
    200: "#f7e490",
    300: "#f2d157",
    400: "#efbe30",
    500: "#e89f18",
    600: "#cd7a12",
    700: "#ab5712",
    800: "#8b4415",
    900: "#633112",
  },
  teal: {
    50: "#e9fffc",
    100: "#c7fff7",
    200: "#96fff1",
    300: "#4dffea",
    400: "#00ffee",
    500: "#00f2f8",
    600: "#00bfd0",
    700: "#0098a7",
    800: "#047481",
    900: "#086271",
  },
  // Red
  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },
  green: {
    50: "#f0fdf5",
    100: "#dcfce9",
    200: "#bbf7d3",
    300: "#86efb0",
    400: "#4ade85",
    500: "#22c563",
    600: "#16a34e",
    700: "#15803f",
    800: "#166535",
    900: "#14532d",
  },
};

const fontSize = {
  xs: "12px",
  sm: "13px",
  md: "14px",
  lg: "16px",
  xl: "18px",
  xxl: "22px",
  "3xl": "24px",
  "4xl": "28px",
  "5xl": "36px",
  "6xl": "48px",
};

const fontWeight = {
  DEFAULT: 400,
  hairline: 100,
  "extra-light": 100,
  thin: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  "extra-bold": 800,
  black: 900,
};

const borderRadius = {
  none: "0px",
  sm: "2px",
  md: "4px",
  lg: "8px",
  xl: "10px",
  xxl: "16px",
  full: "9999px",
};

const zIndex = {
  "-1": "-1",
  0: "0",
  10: "10",
  20: "20",
  30: "30",
  40: "40",
  50: "50",
  100: "100",
};

const renderSpacings = (extendSpacings = {}) => {
  const spacing = {
    ...extendSpacings,
  };
  // 0px --> 100px | 0px 5px 10px 15px,...
  for (let i = 0; i < 10; i += 0.5) {
    spacing[i] = `${i * 10}px`;
  }
  // 100px --> 1000px | 100px 110px 120px,...
  for (let i = 10; i < 100; i++) {
    spacing[i] = `${i * 10}px`;
  }
  return spacing;
};

const spacing = renderSpacings({
  full: "100%",
  fit: "fit-content",
});

const boxShadow = {
  sm: "0 4px 6px rgb(50 50 93 / 10%), 0 1px 3px rgb(0 0 0 / 8%);",
  md: "0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1)",
  lg: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
};

const utilsPlugin = plugin(function ({ addBase, addComponents, theme }) {
  addComponents({
    ".icon-lg": {
      width: "40px",
      height: "40px",
    },
    ".icon-md": {
      width: "24px",
      height: "24px",
    },
    ".icon-sm": {
      width: "20px",
      height: "20px",
    },
    ".icon-tn": {
      width: "16px",
      height: "16px",
    },
    ".move-center-x": {
      left: "50%",
      transform: "translateX(-50%)",
    },
    ".move-center-y": {
      top: "50%",
      transform: "translateY(-50%)",
    },
    ".move-center": {
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    },
    ".paragraph-with-2-line": {
      display: "-webkit-box",
      "-webkit-line-clamp": 2,
      "-webkit-box-orient": "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    ".center-children": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  });
});

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens,
    colors,
    fontSize,
    spacing,
    fontWeight,
    borderRadius,
    zIndex,
    boxShadow,
    maxWidth: {
      ...spacing,
      ...screens,
    },
    extend: {
      borderColor: {
        DEFAULT: colors.gray[200],
      },
    },
  },
  plugins: [utilsPlugin],
};
