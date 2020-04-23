const { createClient } = require("./client");
const { Resource } = require("./resource");

/**
 * @typedef {{title: string, fields: string[]}} SiteList
 * @typedef {{name: string, relativePath: string, lists: SiteList[]}} Site
 * @typedef {import('gatsby').SourceNodesArgs} Helpers
 */

/**
 * Generates Gatsby source nodes attached to a Sharepoint Online tenant.
 * @param {Helpers} helpers Gatsby Node Helpers.
 * @param {any} config Config object provided in the plugin config.
 */
exports.sourceNodes = function sourceNodes(helpers, config, callback) {
  const { plugins, host, sites = [], ...creds } = config;
  const client = createClient(creds);
  const listResource = new Resource("list");

  // Flatten out the sites (lists and drives) into a single array
  // where each element will represent a Microsoft Graph request.
  const resources = sites.reduce((acc, current) => {
    const { lists = [] } = current;

    const listRequests = lists
      .filter((item) => listResource.validate(item))
      .map(listResource.requestFactory(host, current, client, helpers));

    acc.push(...listRequests);

    return acc;
  }, []);

  Promise.all(resources.map((resource) => resource.get()))
    .catch(console.error)
    .finally(callback);
};
