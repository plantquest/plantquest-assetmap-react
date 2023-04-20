const react = require('@vitejs/plugin-react')

module.exports = {
  plugins: [react()],
  build: {
    target: 'es6',
    lib: {
      entry: 'src/index.jsx',
      name: 'PlantQuestAssetMap',
      fileName: 'pqam-react',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
}
