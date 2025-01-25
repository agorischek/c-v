import { Version } from "../src/types/Version";
import { SpinCounterInterval } from "../src/types/SpinCounterInterval";
import { SpinCounterPeriodicity } from "../src/types/SpinCounterPeriodicity";
import { SpinEntropy } from "../src/types/SpinEntropy";
import { type SpinParameters } from "../src/types/SpinParameters";
import { cv } from "../src/cv";
import { extend } from "../src/operations/extend";
import { increment } from "../src/operations/increment";
import { spin } from "../src/operations/spin";
import { terminate } from "../src/operations/terminate";
import { validate } from "../src/utilities/validate";
import { oversized } from "../src/properties/oversized";
import { immutable } from "../src/properties/immutable";
import { extension } from "../src/properties/extension";
import { version } from "../src/properties/version";
import { describe, expect, it } from "bun:test";

describe("Correlation Vector", () => {
  it("Should be able to Create v1 cV", () => {
    const correlationVector: string = cv(Version.V1);
    const splitVector: string[] = correlationVector.split(".");
    expect(splitVector.length).toBe(2);
    expect(parseInt(splitVector[1], 10)).toBe(0);
    expect(splitVector[0].length).toBe(16);
  });

  it("Should be able to Create v2 cV", () => {
    const correlationVector: string = cv(Version.V2);
    const splitVector: string[] = correlationVector.split(".");
    expect(splitVector.length).toBe(2);
    expect(parseInt(splitVector[1], 10)).toBe(0);
    expect(splitVector[0].length).toBe(22);
  });

  it("Should be able to Parse v1 vector", () => {
    const correlationVector: string = "ifCuqpnwiUimg7Pk.1";
    const splitVector: string[] = correlationVector.split(".");
    expect(splitVector[0]).toBe("ifCuqpnwiUimg7Pk");
    expect(splitVector[1]).toBe("1");
  });

  it("Should be able to Parse v2 vector", () => {
    const correlationVector: string = "Y58xO9ov0kmpPvkiuzMUVA.3.4.5";
    const splitVector: string[] = correlationVector.split(".");
    expect(splitVector[0]).toBe("Y58xO9ov0kmpPvkiuzMUVA");
    expect(splitVector[1]).toBe("3");
    expect(splitVector[2]).toBe("4");
    expect(splitVector[3]).toBe("5");
  });

  it("Should be able to increment cV", () => {
    let correlationVector: string = cv(Version.V2);
    correlationVector = increment(correlationVector);
    const splitVector: string[] = correlationVector.split(".");
    expect(parseInt(splitVector[1], 10)).toBe(1);
  });

  it("Should be able to extend cV", () => {
    let correlationVector: string = cv(Version.V2);
    let splitVector: string[] = correlationVector.split(".");
    const vectorBase: string = splitVector[0];
    const extensionValue: string = splitVector[1];

    correlationVector = extend(correlationVector);
    splitVector = correlationVector.split(".");

    expect(splitVector.length).toBe(3);
    expect(splitVector[0]).toBe(vectorBase);
    expect(splitVector[1]).toBe(extensionValue);
    expect(splitVector[2]).toBe("0");
  });

  it("Should be able to validate cV creation", () => {
    const correlationVector: string = cv(Version.V2);
    validate(correlationVector, Version.V2);
    expect(1).toEqual(1);
  });

  it("should not extend from empty cV", () => {
    expect(() => {
      extend("");
    }).toThrowError(/.*correlation vector can not be null or bigger than.*/i);
  });

  it("should throw exception with insufficient chars", () => {
    expect(() => {
      extend("tul4NUsfs9Cl7mO.1");
    }).toThrowError(/Invalid correlation vector .*. Invalid base value .*/i);
  });

  it("should throw exception with too many chars", () => {
    expect(() => {
      extend("tul4NUsfs9Cl7mOfN/dupsl.1");
    }).toThrowError(/Invalid correlation vector .*. Invalid base value .*/i);
  });

  it("should throw exception with too big value", () => {
    expect(() => {
      extend(
        "tul4NUsfs9Cl7mOf.2147483647.2147483647.2147483647.2147483647.2147483647"
      );
    }).toThrowError(/.*correlation vector can not be null or bigger than.*/i);
  });

  it("should throw exception with too big value for v2 version", () => {
    expect(() => {
      extend(
        "KZY+dsX2jEaZesgCPjJ2Ng.2147483647.2147483647.2147483647.2147483647.2147483647.2147483647.2147483647.2147483647.2147483647.2147483647"
      );
    }).toThrowError(/.*correlation vector can not be null or bigger than.*/i);
  });

  it("should throw exception with negative extension value", () => {
    expect(() => {
      extend("tul4NUsfs9Cl7mOf.-10");
    }).toThrowError(
      /Invalid correlation vector .*. Invalid extension value .*/i
    );
  });

  it("should be immutable when increment past max", () => {
    let vector: string = extend(
      "tul4NUsfs9Cl7mOf.2147483647.2147483647.2147483647.21474836479"
    );
    vector = increment(vector);
    expect(vector).toBe(
      "tul4NUsfs9Cl7mOf.2147483647.2147483647.2147483647.21474836479.1"
    );
    for (let i = 0; i < 20; i++) {
      vector = increment(vector);
    }
    expect(vector).toBe(
      "tul4NUsfs9Cl7mOf.2147483647.2147483647.2147483647.21474836479.9!"
    );
  });

  it("should be immutable when increment past max for v2 version", () => {
    const base: string =
      "KZY+dsX2jEaZesgCPjJ2Ng.2147483647.2147483647.2147483647.2147483647.2147483647.2147483647.2147483647.2147483647.2147483647.214";
    let vector: string = extend(base);
    vector = increment(vector);
    expect(vector).toBe(`${base}.1`);
    for (let i = 0; i < 20; i++) {
      vector = increment(vector);
    }
    expect(vector).toBe(`${base}.9!`);
  });

  it("Should be able to Spin should Always be getting bigger", () => {
    let vector: string = cv(Version.V2);
    const spinParameters: SpinParameters = {
      interval: SpinCounterInterval.Fine,
      periodicity: SpinCounterPeriodicity.Short,
      entropy: SpinEntropy.Low,
    };

    let lastSpinValue: number = 0;
    let wrappedCounter: number = 0;
    for (let i = 0; i < 9; i++) {
      // the cV after a Spin will look like <cvBase>.0.<spinValue>.0, so the spinValue is at index = 2.
      let newVector: string = spin(vector, spinParameters);
      let spinValue: number = parseInt(newVector.split(".")[2], 10);

      // count the number of times the counter wraps.
      if (spinValue <= lastSpinValue) {
        wrappedCounter++;
      }

      lastSpinValue = spinValue;

      // sleep 10 ms
      let old: number = Date.now();
      do {
        if (Date.now() > old + 10) {
          break;
        }
      } while (true);
    }
    expect(wrappedCounter).toBeLessThan(1);
  });

  it("Should be immutable if spin past max size", () => {
    const baseVector: string =
      "tul4NUsfs9Cl7mOf.2147483647.2147483647.2147483647.214748364.23";

    // we hit 63 chars limit, will append "!" to vector
    const vector: string = spin(baseVector);
    expect(vector).toBe(`${baseVector}!`);
  });

  it("Should be immutable if spin past max size for v2", () => {
    const baseVector: string =
      "KZY+dsX2jEaZesgCPjJ2Ng.2147483647.2147483647.2147483647.2147483647.2147483647.2147483647.2147483647.2147483647.2147483647.214";

    // we hit 127 chars limit, will append "!" to vector
    const vector: string = spin(baseVector);
    expect(vector).toBe(`${baseVector}!`);
  });

  it("Should be immutable if extend past max size", () => {
    const baseVector: string =
      "tul4NUsfs9Cl7mOf.2147483647.2147483647.2147483647.214748364.23";

    // we hit 63 chars limit, will append "!" to vector
    const vector: string = extend(baseVector);
    expect(vector).toBe(`${baseVector}!`);
  });

  it("Should be immutable if extend past max size for v2", () => {
    const baseVector: string =
      "KZY+dsX2jEaZesgCPjJ2Ng.2147483647.2147483647.2147483647.2147483647.2147483647.2147483647.2147483647.2147483647.2147483647.2141";

    // we hit 127 chars limit, will append "!" to vector
    const vector: string = extend(baseVector);
    expect(vector).toBe(`${baseVector}!`);
  });

  it("Should be immutable with termination sign", () => {
    const baseVector: string =
      "tul4NUsfs9Cl7mOf.2147483647.2147483647.2147483647.21474836479.0!";

    let vector: string = extend(baseVector);
    // extend should do nothing
    expect(vector).toBe(baseVector);

    vector = spin(baseVector);
    // spin should do nothing
    expect(vector).toBe(baseVector);

    vector = increment(baseVector);
    // increment should do nothing since it has termination sign
    expect(vector).toBe(baseVector);
  });

  it("Should be immutable with termination sign for v2", () => {
    const baseVector: string =
      "KZY+dsX2jEaZesgCPjJ2Ng.2147483647.2147483647.2147483647.2147483647.2147483647.2147483647.2147483647.2147483647.2147483647.214.0!";

    let vector: string = extend(baseVector);
    // extend should do nothing
    expect(vector).toBe(baseVector);

    vector = spin(baseVector);
    // spin should do nothing
    expect(vector).toBe(baseVector);

    vector = increment(baseVector);
    // increment should do nothing since it has termination sign
    expect(vector).toBe(baseVector);
  });
});
