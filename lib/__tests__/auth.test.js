const NodeAuthenticationProvider = require("../auth");

describe("NodeAuthenticationProvider", () => {
  test("should provide a token", async () => {
    // Arrange
    const provider = new NodeAuthenticationProvider(
      process.env.AppId,
      process.env.AppSecret,
      process.env.TenantId
    );

    // Act
    const token = await provider.getAccessToken(
      "https://graph.microsoft.com/.default"
    );

    // Assert
    expect(token).toBeDefined();
  });
});
