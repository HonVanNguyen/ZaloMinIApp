module.exports = {
  // v3
  // content: ["./src/**/*.{html,js,ts,jsx,tsx,vue}"],
  
  // v2
  purge: {
    enabled: true,
    content: ["./src/**/*.{ts,tsx}"],
  },
  theme: {
    extend: {
      colors: {
        primary: "var(--zmp-primary-color)",
        gray: "#767A7F",
        divider: "#E9EBED",
        green: "#288F4E",
        background: "#ffffff",
        skeleton: "rgba(0, 0, 0, 0.1)",
      },
    },
  }
};
