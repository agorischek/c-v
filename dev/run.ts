import { cv, increment, extend, spin } from "../src";
import { spin2 } from "../src/operations/spin2";
import { spin3 } from "../src/spin3/spin3";

// const incremented = increment(vector);
// console.log(incremented);

// const extended = extend(incremented);
// console.log(extended);

const original = "OiIVzqJGUa+/mcT1.0";
const spun = spin3(original);
console.log(spun);
