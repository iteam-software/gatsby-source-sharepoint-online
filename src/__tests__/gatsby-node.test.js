const { sourceNodes } = require("../gatsby-node");

describe("Gatsby Node Hook", () => {
  test("should load all lists for a given site.", (done) => {
    // Arrange
    const config = {
      site: "df6437cc-b0e5-4f13-ba4b-4c6bb14b0bfa",
      appId: process.env.AppId,
      appSecret: process.env.AppSecret,
      tenantId: process.env.TenantId,
    };

    const helpers = {
      createNodeId: jest.fn(),
      createContentDigest: jest.fn(),
      actions: {
        createNode: jest.fn(),
      },
    };

    // Act & Assert
    sourceNodes(helpers, config, () => {
      expect(helpers.actions.createNode).toHaveBeenCalled();
      done();
    });
  });
});
