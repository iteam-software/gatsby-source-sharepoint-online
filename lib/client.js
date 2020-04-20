const { Client } = require("@microsoft/microsoft-graph-client");
const NodeAuthenticationProvider = require("./auth");

module.exports = Client.initWithMiddleware({
  authProvider: new NodeAuthenticationProvider(),
});
