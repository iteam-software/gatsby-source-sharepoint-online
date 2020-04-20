const NodeAuthenticationProvider = require("../auth");

describe("NodeAuthenticationProvider", () => {
  test("should provide a token", async () => {
    const provider = new NodeAuthenticationProvider();
    const token = await provider.getAccessToken();

    expect(token).toBeDefined();
  });
});
