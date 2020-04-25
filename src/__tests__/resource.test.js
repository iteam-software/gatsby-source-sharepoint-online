const { createClient } = require("../client");
const { Resource } = require("../resource");

const consoleWarn = console.warn;

describe("[Resource]", () => {
  const helpers = {
    createNodeId: jest.fn(),
    createContentDigest: jest.fn(),
    actions: {
      createNode: jest.fn(),
    },
  };

  const baseConfig = {
    host: "TestHost",
    appId: "TestApp",
    appSecret: "TestSecret",
    tenantId: "TestTenant",
  };

  beforeEach(() => {
    console.warn = jest.fn();
  });

  afterEach(() => {
    console.warn = consoleWarn;
    helpers.createNodeId.mockReset();
    helpers.createContentDigest.mockReset();
    helpers.actions.createNode.mockReset();
  });

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

  test("should create a get request from the request factory", async () => {
    // Arrange
    const resource = new Resource("list");
    const client = createClient(baseConfig);
    const request = resource.requestFactory("test", "test", client, helpers);

    // Act
    await request({ title: "Heroes", fields: ["Superpower"] });

    // Assert
    expect(helpers.actions.createNode).toHaveBeenCalledTimes(1);
  });

  test("should create a get request from the request factory with no fields", async () => {
    // Arrange
    const resource = new Resource("list");
    const client = createClient(baseConfig);
    const request = resource.requestFactory("test", "test", client, helpers);

    // Act
    await request({ title: "Heroes" });

    // Assert
    expect(helpers.actions.createNode).toHaveBeenCalledTimes(1);
  });
});
