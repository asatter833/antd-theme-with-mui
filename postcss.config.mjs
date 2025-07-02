const config = {
  plugins: {
    "@tailwindcss/postcss": {
      config: "./tailwind.config.js", // Explicit path to config
    }, // Changed from 'tailwindcss' to '@tailwindcss/postcss'
    autoprefixer: {},
  },
};

export default config;
