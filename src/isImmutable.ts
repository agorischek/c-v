import { terminationSign } from "./constants";

export const isImmutable = (correlationVector: string): boolean => {
  return correlationVector && correlationVector.endsWith(terminationSign);
};
