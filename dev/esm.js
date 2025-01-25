import { cv, extend, increment, spin } from '../dist/cv';

console.log('Running from ESM dist...');

const initial = cv();
console.log('Initial:    ', initial);

const incremented = increment(initial);
console.log('Incremented:', incremented);

const extended = extend(incremented);
console.log('Extended:   ', extended);

const spun = spin(extended);
console.log('Spun:       ', spun);
