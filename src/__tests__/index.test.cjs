const { Resource } = require("../resource");
const { sourceNodes } = require("..");

jest.mock("../resource");
const consoleError = console.error;

describe("sourceNodes hook", () => {
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

  afterEach(() => {
    helpers.createNodeId.mockReset();
    helpers.createContentDigest.mockReset();
    helpers.actions.createNode.mockReset();
    console.error = consoleError;
  });

  test("should load all lists for a given site.", async () => {
    // Arrange
    Resource.mockImplementation(() => ({
      requestFactory: () => () =>
        new Promise((res, rej) => {
          helpers.actions.createNode();
          res();
        }),
      validate: () => true,
    }));
    const config = {
      sites: [
        {
          name: "TestSite",
          relativePath: "sites/TestSite",
          lists: [
            {
              title: "People",
              fields: ["Person", "Workplace"],
            },
            {
              title: "Hero",
              fields: ["Superpower"],
            },
          ],
        },
      ],
      ...baseConfig,
    };

    // Act
    await sourceNodes(helpers, config);

    // Assert
    expect(helpers.actions.createNode).toHaveBeenCalledTimes(2);
  });

  test("should load data for list when no fields are provided.", async () => {
    // Arrange
    Resource.mockImplementation(() => ({
      requestFactory: () => () =>
        new Promise((res, rej) => {
          helpers.actions.createNode();
          res();
        }),
      validate: () => true,
    }));
    const config = {
      sites: [
        {
          name: "TestSite",
          relativePath: "sites/TestSite",
          lists: [
            {
              title: "People",
            },
          ],
        },
      ],
      ...baseConfig,
    };

    // Act
    await sourceNodes(helpers, config);

    // Assert
    expect(helpers.actions.createNode).toHaveBeenCalledTimes(1);
  });

  test("should run when sites is undefined", async () => {
    // Act
    await sourceNodes(helpers, baseConfig);

    // Assert
    expect(helpers.actions.createNode).not.toHaveBeenCalled();
  });

  test("should not run when a list is invalid", async () => {
    // Arrange
    Resource.mockImplementation(() => ({
      requestFactory: () => () =>
        new Promise((res, rej) => {
          helpers.actions.createNode();
          res();
        }),
      validate: () => false,
    }));
    const config = {
      sites: [
        {
          name: "TestSite",
          relativePath: "sites/TestSite",
          lists: [
            {
              name: "People",
            },
          ],
        },
      ],
      ...baseConfig,
    };

    // Act
    await sourceNodes(helpers, config);

    // Assert
    expect(helpers.actions.createNode).not.toHaveBeenCalled();
  });

  test("should catch and log errors on get", async () => {
    // Arrange
    console.error = jest.fn();
    Resource.mockImplementation(() => ({
      requestFactory: () => () =>
        new Promise((res, rej) => {
          rej("failure");
        }),
      validate: () => true,
    }));
    const config = {
      sites: [
        {
          name: "TestSite",
          relativePath: "sites/TestSite",
          lists: [
            {
              title: "People",
            },
          ],
        },
      ],
      ...baseConfig,
    };

    // Act
    await sourceNodes(helpers, config);

    // Assert
    expect(helpers.actions.createNode).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith("failure");
  });

  test("should run when lists is undefined", async () => {
    // Arrange
    const config = {
      sites: [
        {
          name: "TestSite",
          relativePath: "sites/TestSite",
        },
      ],
      ...baseConfig,
    };

    // Act
    await sourceNodes(helpers, config);

    // Assert
    expect(helpers.actions.createNode).not.toHaveBeenCalled();
  });
});
