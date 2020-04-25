const { createClient } = require("./client");
const { Resource } = require("./resource");

/**
 * @typedef {import('gatsby').SourceNodesArgs} Helpers
 */

/**
 * Generates Gatsby source nodes attached to a Sharepoint Online tenant.
 * @param {Helpers} helpers Gatsby Node Helpers.
 * @param {any} config Config object provided in the plugin config.
 */
exports.sourceNodes = async (helpers, config) => {
  const { host, sites = [], ...creds } = config;
  const client = createClient(creds);
  const listResource = new Resource("list");

  for (let i = 0; i < sites.length; i++) {
    const { lists = [] } = sites[i];
    const get = listResource.requestFactory(host, sites[i], client, helpers);

    for (let j = 0; j < lists.length; j++) {
      const list = lists[j];

      if (!listResource.validate(list)) {
        continue;
      }

      try {
        await get(list);
      } catch (err) {
        console.error(err);
      }
    }
  }
};
