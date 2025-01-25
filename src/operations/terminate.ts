import { terminationSign } from "../constants";

export const terminate = (correlationVector: string): string => {
  return correlationVector + terminationSign;
};
