jest.mock("isomorphic-fetch");
import fetch from "isomorphic-fetch";
import NodeAuthenticationProvider from "../auth.mjs";
import { Response } from "node-fetch";

describe("NodeAuthenticationProvider", () => {
  test("should provide a token", async () => {
    // Arrange
    fetch.mockReturnValue(
      Promise.resolve(
        new Response(JSON.stringify({ access_token: "token" }), {
          status: 200,
          statusText: "OK"
        })
      )
    );
    const provider = new NodeAuthenticationProvider(
      "testApp",
      "testSecret",
      "testTenant"
    );

    // Act
    const token = await provider.getAccessToken();

    // Assert
    expect(token).toBeDefined();
  });

  test("should throw for failed token request", async () => {
    // Arrange
    fetch.mockReturnValue(
      Promise.resolve(
        new Response(null, {
          status: 400,
          statusText: "BadRequest"
        })
      )
    );
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
