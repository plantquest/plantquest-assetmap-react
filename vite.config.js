const react = require('@vitejs/plugin-react')

module.exports = {
  plugins: [
    react({
      jsxRuntime: 'classic',
    }),
  ],
  build: {
    minify: false,
    target: 'es6',
    lib: {
      entry: 'src/index.jsx',
      name: 'PlantQuestAssetMap',
      fileName: 'pqam-react',
      formats: ['es', 'umd'],
    },
    emptyOutDir: false,
    rollupOptions: {
      treeshake: false,
      external: [
        'react',
        'react/jsx-runtime',
        'react-dom',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
  },
}
