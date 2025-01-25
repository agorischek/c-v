export const base64CharSet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

/**
 * This is termination sign should be used when vector length exceeds
 * max allowed length
 */
export const terminationSign = "!";

// In order to reliably convert a V2 vector base to a guid, the four least significant bits of the last base64
// content-bearing 6-bit block must be zeros.
//
// Base64 characters with four least significant bits of zero are:
// A - 00 0000
// Q - 01 0000
// g - 10 0000
// w - 11 0000
export const base64LastCharSet = "AQgw";
