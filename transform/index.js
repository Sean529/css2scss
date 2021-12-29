const fs = require('fs').promises
const parse = require('./parse')
const sass2css = require('./sass2css')
const css2sass = require('./css2sass')

module.exports = function ({ input, output }) {
  const { parseContent, reductionContent } = parse()
  return new Promise(async (resolve, reject) => {
    try {
      let content = await fs.readFile(input, 'utf-8')
      content = parseContent(content)
      content = await sass2css(content)
      content = reductionContent(css2sass(content.css.toString()))
      await fs.writeFile(output, content)
      resolve(content)
    } catch (error) {
      reject(error)
    }
  })
}
