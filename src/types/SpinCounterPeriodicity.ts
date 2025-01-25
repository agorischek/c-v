export enum SpinCounterPeriodicity {
  /**
   * Do not store a counter as part of the spin value.
   */
  None = 0,

  /**
   * The short periodicity stores the counter using 16 bits.
   */
  Short = 16,

  /**
   * The medium periodicity stores the counter using 24 bits.
   */
  Medium = 24,
}
