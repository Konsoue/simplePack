const Compiler = require('./compiler');
const options = require('../simplePack.config');


const compiler = new Compiler(options);

compiler.run()