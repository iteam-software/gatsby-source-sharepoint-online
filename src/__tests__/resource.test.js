const { Resource } = require("../resource");

const consoleWarn = console.warn;

beforeEach(() => {
  console.warn = jest.fn();
});

afterEach(() => {
  console.warn = consoleWarn;
});

describe("[Resource]", () => {
  test("should construct a list resource", () => {
    // Act
    const resource = new Resource("list");

    // Assert
    expect(resource).toBeDefined();
  });

  test("should warn when a drive type is attempted", () => {
    // Act
    new Resource("drive");

    // Assert
    expect(console.warn).toHaveBeenCalledWith("Drives are not yet supported.");
  });

  test("should validate a list item", () => {
    // Arrange
    const resource = new Resource("list");

    // Act
    const isValid = resource.validate({ title: "test" });

    // Assert
    expect(isValid).toBe(true);
  });

  test("should invalidate an undefined list item", () => {
    // Arrange
    const resource = new Resource("list");

    // Act
    const isValid = resource.validate();

    // Assert
    expect(isValid).toBe(false);
    expect(console.warn).toHaveBeenCalledWith(
      "Invalid resource item: undefined"
    );
  });

  test("should invalidate a list item with no title", () => {
    // Arrange
    const resource = new Resource("list");

    // Act
    const isValid = resource.validate({});

    // Assert
    expect(isValid).toBe(false);
    expect(console.warn).toHaveBeenCalledWith("Invalid resource item: {}");
  });

  test("should invalidate a list item with an empty title", () => {
    // Arrange
    const resource = new Resource("list");

    // Act
    const isValid = resource.validate({ title: "" });

    // Assert
    expect(isValid).toBe(false);
    expect(console.warn).toHaveBeenCalledWith(
      'Invalid resource item: {"title":""}'
    );
  });

  test("should invalidate a drive item", () => {
    // Arrange
    const resource = new Resource("drive");

    // Act
    const isValid = resource.validate();

    // Assert
    expect(isValid).toBe(false);
    expect(console.warn).toHaveBeenCalledTimes(2);
  });
});
