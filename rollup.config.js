module.exports = {
  input: './src/index.js',
  output: [{
    dir: 'dist/cjs',
    format: 'cjs',
    sourcemap: true,
    preserveModules: true,
  }, {
    dir: 'dist/esm',
    format: 'es',
    sourcemap: true,
    preserveModules: true,
  }],
  plugins: [require('@rollup/plugin-buble')()],
  external(id) { return !/^[\.\/]/.test(id) }
}