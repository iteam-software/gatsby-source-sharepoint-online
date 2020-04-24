const { Client } = require("@microsoft/microsoft-graph-client");
const { NodeAuthenticationProvider } = require("./auth");

/**
 * Create a Microsot Graph Client to use for sourcing.
 * @param {{ appId: string, appSecret: string, tenantId: string }} options The plugin options.
 * @returns {Client} The Microsoft Graphl client.
 */
function createClient(options) {
  if (!options) {
    throw new Error("Argument null or undefined: options");
  }

  return Client.initWithMiddleware({
    authProvider: new NodeAuthenticationProvider(
      options.appId,
      options.appSecret,
      options.tenantId
    ),
  });
}

exports.createClient = createClient;
