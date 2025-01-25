const { cv, increment, extend, spin } = require('../dist/cv');
const { format } = require('./common/format');

const initial = cv();
const incremented = increment(initial);
const extended = extend(incremented);
const spun = spin(extended);

console.log(format('CJS', initial, incremented, extended, spun));
