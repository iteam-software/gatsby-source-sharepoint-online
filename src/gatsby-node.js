const { createClient } = require("./client");
const { flatten } = require("lodash");

/**
 * @typedef {import('gatsby').SourceNodesArgs} Helpers
 */

/**
 * Generates Gatsby source nodes attached to a Sharepoint Online tenant.
 * @param {Helpers} helpers Gatsby Node Helpers.
 * @param {any} config Config object provided in the plugin config.
 */
function sourceNodes(helpers, config, callback) {
  const {
    createNodeId,
    createContentDigest,
    actions: { createNode },
  } = helpers;
  const { site, plugins, ...creds } = config;
  const client = createClient(creds);

  client
    .api(`/sites/${site}/lists`)
    .get()
    .then((result) =>
      Promise.all(
        result.value.map((list) =>
          client
            .api(`/sites/${site}/lists/${list.id}/items?expand=fields`)
            .get()
        )
      )
    )
    .then(flatten)
    .then((item) => {
      createNode({
        item,
        id: createNodeId(`sharepoint-item-${item.id}`),
        parent: null,
        children: [],
        internal: {
          type: "SharePointOnlineListItem",
          content: JSON.stringify(item),
          contentDigest: createContentDigest(item),
        },
      });
    })
    .catch(console.error)
    .finally(callback);
}

exports.sourceNodes = sourceNodes;
