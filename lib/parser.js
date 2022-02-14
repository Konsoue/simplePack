const fs = require('fs');
const babylon = require('babylon')
const traverse = require('babel-traverse').default
const { transformFromAst } = require('babel-core')
module.exports = {
  getAST: (path) => {
    const content = fs.readFileSync(path, 'utf8');
    return babylon.parse(content, {
      sourceType: 'module'
    });
  },
  getDependencies: (AST) => {
    const dependencies = [];
    traverse(AST, {
      ImportDeclaration: ({ node }) => {
        dependencies.push(node.source.value)
      }
    })
    return dependencies;
  },
  transform: (AST) => {
    const { code } = transformFromAst(AST, null, {
      presets: ['env']
    })
    return code;
  }
}