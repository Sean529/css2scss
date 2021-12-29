const varKey = '__TIM_VAR_SING_KEY__'
const includeKey = '__TIM_INCLUDE_SING_KEY__'

const varReg = new RegExp(`("${varKey}[0-9]+")`, 'gm')
const includeReg = new RegExp(`(${includeKey}: "${includeKey}[0-9]+"?;)`, 'gm')

module.exports = function () {
  let varKeyMap = {}
  let importKeyArr = []
  let includeKeyMap = {}

  return {
    parseContent (content) {
      let varIdx = 0
      // @include aaa() 、 @include aaa();
      content = content.replace(/(\@include .*?\);?)/gm, (_, $1) => {
        let t = `${includeKey}: "${includeKey + varIdx++}";`
        includeKeyMap[t] = $1
        return t
      })
      // @include aaa 、 @include aaa;
      content = content.replace(/(\@include [a-zA-Z0-9-_]+;?)/gm, (_, $1) => {
        console.log($1)
        let t = `${includeKey}: "${includeKey + varIdx++}";`
        includeKeyMap[t] = $1
        return t
      })
      // $ss-99
      content = content.replace(/(\$[a-zA-Z0-9-_]+)/gm, (_, $1) => {
        let t = `"${varKey + varIdx++}"`
        varKeyMap[t] = $1
        return t
      })
      // @import xxx;
      return content.replace(/(\@import.*?;)/gm, (_, $1) => {
        importKeyArr.push($1)
        return ''
      })
    },
    reductionContent (content) {
      content = content.replace(varReg, (_, $1) => varKeyMap[$1])
      content = content.replace(includeReg, (_, $1) => includeKeyMap[$1])
      const importContent = importKeyArr.join('\r\n')
      content = importContent + '\r\n' + content
      return content
    }
  }
}
