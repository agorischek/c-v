# c-v

A diminutive API for the [Correlation Vector reference implementation](https://github.com/microsoft/CorrelationVector-JavaScript).

```ts
import { cv, increment, extend, spin } from 'c-v';

const vector = cv();
console.log(vector);
// I+2/FsGclq+zYtife68YdA.0

const incremented = increment(vector);
console.log(incremented);
// I+2/FsGclq+zYtife68YdA.1

const extended = extend(incremented);
console.log(extended);
// I+2/FsGclq+zYtife68YdA.1.0

const spun = spin(extended);
console.log(spun);
// I+2/FsGclq+zYtife68YdA.1.0.384636491.0
```
