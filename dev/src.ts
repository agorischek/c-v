import { cv, extend, increment, spin } from '../src';
import { format } from './common/format';

const initial = cv();
const incremented = increment(initial);
const extended = extend(incremented);
const spun = spin(extended);

console.log(format('Source', initial, incremented, extended, spun));
