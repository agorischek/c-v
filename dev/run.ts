import { cv, increment, extend, spin } from "../src";

const vector = cv();

const incremented = increment(vector);
console.log(incremented);

const extended = extend(incremented);
console.log(extended);

const spun = spin(extended);
console.log(spun);
