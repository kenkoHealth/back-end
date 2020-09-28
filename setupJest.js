const e = require("express");

// Custom Jest matcher to test Object type.
expect.extend({
  toBeType(receivedInput, arg) {
    const initialType = typeof receivedInput;
    if (initialType === arg) {
      return {
        message: () => `expected ${receivedInput} to be type ${initialType}.`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${receivedInput} to be type ${initialType}.`,
        pass: false,
      };
    }
  },
});
// Jest Matcher to check if input is of 'Array' type.
expect.extend({
  toBeArray(receivedInput) {
    if (Array.isArray(receivedInput)) {
      return {
        message: () => `Expected ${receivedInput} to be of type Array.`,
        pass: true,
      };
    } else {
      return {
        message: () => `Expected ${receivedInput} to be of type Array.`,
        pass: false,
      };
    }
  },
});
