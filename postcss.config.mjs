/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    cssnano: {
      preset: [
        'default',
        {
          discardComments: { removeAll: true }, // Removes all CSS comments
          normalizeWhitespace: true, // Minifies whitespace
        },
      ],
    },
  },
};

export default config;
