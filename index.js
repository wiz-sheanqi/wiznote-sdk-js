
let src = './src';
if (process.argv === 'production') {
  src = './dist/wizNoteSdk';
}
const sdk = require(src);
module.exports = sdk;
