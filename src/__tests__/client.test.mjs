import { createClient } from "../client.mjs";

describe("[createClient]", () => {
  test("should throw for undefined or null options", () => {
    // Act & Assert
    expect(() => createClient()).toThrow("Argument null or undefined: options");
    expect(() => createClient(null)).toThrow(
      "Argument null or undefined: options"
    );
  });
});
