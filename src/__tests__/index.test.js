const { sourceNodes } = require("..");

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
  });

  test("should load all lists for a given site.", async () => {
    // Arrange
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
          ],
        },
      ],
      ...baseConfig,
    };

    // Act
    await sourceNodes(helpers, config);

    // Assert
    expect(helpers.actions.createNode).toHaveBeenCalled();
  });

  test("should load data for list when no fields are provided.", async () => {
    // Arrange
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
    expect(helpers.actions.createNode).toHaveBeenCalled();
  });

  test("should run when sites is undefined", async () => {
    // Act
    await sourceNodes(helpers, baseConfig);

    // Assert
    expect(helpers.actions.createNode).not.toHaveBeenCalled();
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
