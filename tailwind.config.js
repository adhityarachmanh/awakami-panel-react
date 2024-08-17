const {
  primaryColor,
  secondaryColor,
  errorColor,
  warningColor,
  infoColor,
  successColor,
  backgroundColorDefault,
  backgroundColorPaper,
  fontFamily,
} = require("./src/constants/app_theme_constant");

module.exports = {
  darkMode: "class",
  prefix: "wd-",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // BASE THEME
        primary: primaryColor,
        secondary: secondaryColor,
        error: errorColor,
        warning: warningColor,
        info: infoColor,
        success: successColor,
        background: {
          default: backgroundColorDefault,
          paper: backgroundColorPaper,
        },
      },
      fontFamily: {
        sans: [fontFamily, "sans-serif"],
      },
      backgroundImage: {
        "login-left": "url('assets/images/login-left.png')",
        "login-right": "url('assets/images/login-right.png')",
        "layout-header": "url('assets/images/layout-header.jpg')",
      },
    },
  },
  plugins: [],
};
