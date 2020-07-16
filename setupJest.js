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
