const transform = require('./transform')
const path = require('path')

transform({
  input: path.resolve(__dirname, 'target', 'input.scss'),
  output: path.resolve(__dirname, 'output', 'output.scss')
})
