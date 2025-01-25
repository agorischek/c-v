# correlation-vector

A diminutive API for the [Correlation Vector reference implementation](https://github.com/microsoft/CorrelationVector-JavaScript). Supports both ESM and CommonJS.

```ts
import { cv, increment, extend, spin } from 'correlation-vector';

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

## Versions

- `v2` (default): 22 character base, 127 character max
- `v1`: 16 character base, 63 character max

## Operations

Operations return a new vector.

- `extend(cv)`: Extends the vector
- `increment(cv)`: Increments the vector
- `spin(cv)`: Spins the vector
- `terminate(cv)`: Terminates the vector with a `!`

## Properties

Properties return information about a vector.

- `base(cv)`: Gets the vector base (`string`)
- `extension(cv)`: Gets the vector extension (`number`)
- `immutable(cv)`: Returns whether the vector is immutable (`boolean`)
- `oversized(cv)`: Returns whether the vector is oversized (`boolean`)

## Helpers

- `split(cv)`: Splits the vector into its segments
- `validate(cv)`: Asserts that the vector uses valid syntax
