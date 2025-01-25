import { terminationSign } from "../constants";

export const immutable = (correlationVector: string): boolean => {
  return correlationVector && correlationVector.endsWith(terminationSign);
};
