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
    const token = await provider.getAccessToken();

    // Assert
    expect(token).toBeDefined();
  });

  test("should throw for failed token request", async () => {
    // Arrange
    const provider = new NodeAuthenticationProvider(
      "testApp",
      "testSecret",
      "testTenant"
    );

    // Act & Assert
    await expect(() => provider.getAccessToken()).rejects.toThrow("400");
  });

  test("should throw if invalid config options are supplied", () => {
    expect(() => new NodeAuthenticationProvider()).toThrow(
      "Invalid appId, appSecret, or tenantId."
    );
  });
});
