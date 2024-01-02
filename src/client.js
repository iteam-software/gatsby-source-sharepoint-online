import { Client } from "@microsoft/microsoft-graph-client";
import NodeAuthenticationProvider from "./auth.js";

/**
 * Create a Microsot Graph Client to use for sourcing.
 * @param {{ appId: string, appSecret: string, tenantId: string }} options The plugin options.
 * @returns {Client} The Microsoft Graphl client.
 */
export const createClient = (options) => {
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
};
