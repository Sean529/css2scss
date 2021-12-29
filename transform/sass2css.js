const sass = require('sass')

module.exports = function sass2css(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const opts = { data, sourceComments: true }
      sass.render(opts, (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    } catch (error) {
      reject(error)
    }
  })
}
