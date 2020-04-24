const { createClient } = require("../client");
const { Client } = require("@microsoft/microsoft-graph-client");
const NodeAuthenticationProvider = require("../auth");

describe("[createClient]", () => {
  test("should initialize a client with a NodeAuthenticationProvider", () => {
    // Act
    const client = createClient({
      appId: "test",
      appSecret: "test-secret",
      tenantId: "test-tenant",
    });

    // Assert
    expect(client).toBeInstanceOf(Client);
    expect(client.config.authProvider).toBeDefined();
    expect(client.config.authProvider).toBeInstanceOf(
      NodeAuthenticationProvider
    );
  });

  test("should throw for undefined or null options", () => {
    // Act & Assert
    expect(() => createClient()).toThrow("Argument null or undefined: options");
    expect(() => createClient(null)).toThrow(
      "Argument null or undefined: options"
    );
  });
});
