class NodeAuthenticationProvider {
  /**
   * Gets an access token.
   * @returns {Promise.<string>} The access token.
   */
  async getAccessToken() {
    throw new Error("Not implemented.");
  }
}

module.exports = NodeAuthenticationProvider;
