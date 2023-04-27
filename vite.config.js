const react = require('@vitejs/plugin-react')

module.exports = {
  plugins: [react()],
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
