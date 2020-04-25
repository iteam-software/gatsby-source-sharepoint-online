const qs = require("query-string");
const fetch = require("isomorphic-fetch");

exports.NodeAuthenticationProvider = class {
  /**
   * The Azure App Registration id.
   * @type {string}
   */
  appId = null;

  /**
   * The Azure App Registration secret.
   * @type {string}
   */
  appSecret = null;

  /**
   * The Azure tenant id.
   * @type {string}
   */
  tenantId = null;

  /**
   * Use an Azure App Registration credential to create a NodeAuthenticationProvider.
   * @param {string} appId The Azure App Registration id.
   * @param {string} appSecret The Azure secret beloginging to the Azure App Registration.
   * @param {string} tenantId The Azure tenant id.
   */
  constructor(appId, appSecret, tenantId) {
    if (!appId || !appSecret || !tenantId) {
      throw new Error("Invalid appId, appSecret, or tenantId.");
    }

    this.appId = appId;
    this.appSecret = appSecret;
    this.tenantId = tenantId;
  }

  /**
   * Gets an access token.
   * @returns {Promise.<string>} The access token.
   */
  async getAccessToken() {
    const url = `https://login.microsoft.com/${this.tenantId}/oauth2/v2.0/token`;
    const body = qs.stringify({
      grant_type: "client_credentials",
      client_id: this.appId,
      client_secret: this.appSecret,
      scope: "https://graph.microsoft.com/.default",
    });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    if (!response.ok) {
      throw new Error(response.status);
    }

    const payload = await response.json();
    return payload.access_token;
  }
};
