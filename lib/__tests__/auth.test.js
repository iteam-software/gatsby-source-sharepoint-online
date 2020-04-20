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

  test("should throw if invalid config options are supplied", () => {
    expect(() => new NodeAuthenticationProvider()).toThrow(
      "Invalid appId, appSecret, or tenantId."
    );
  });

  test("should throw if no scope is provided", () => {
    // Arrange
    const provider = new NodeAuthenticationProvider(
      process.env.AppId,
      process.env.AppSecret,
      process.env.TenantId
    );

    // Act & Assert
    expect(() => provider.getAccessToken()).rejects.toThrow("400");
  });
});
