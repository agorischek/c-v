import { cv, extend, increment, spin } from '../dist/cv';
import { format } from './common/format';

const initial = cv();
const incremented = increment(initial);
const extended = extend(incremented);
const spun = spin(extended);

console.log(format('ESM', initial, incremented, extended, spun));
