const { createClient } = require("./client");

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
  const {
    createNodeId,
    createContentDigest,
    actions: { createNode },
  } = helpers;
  const { plugins, host, sites, ...creds } = config;
  const client = createClient(creds);

  /**
   * Process a site.
   * @param {Site} site The site to process.
   */
  const processSite = (site) => {
    if (!site) {
      throw new Error("site must be defined.");
    }

    /**
     * Process a site list.
     * @param {string} siteId The id of the site this list belongs to.
     * @param {SiteList} list The site list.
     */
    const processList = (siteId, list) =>
      client
        .api(`/sites/${siteId}/lists/${list.title}/items`)
        .expand("fields")
        .expand(`fields($select=${list.fields.join(",")})`)
        .get()
        .then((entry) => entry.value)
        .then((items) =>
          items.forEach((item) => {
            createNode({
              item,
              id: createNodeId(`${siteId}/${site.name}/${item.id}`),
              parent: null,
              children: [],
              internal: {
                type: `${site.name}${list.title}`,
                content: JSON.stringify(item),
                contentDigest: createContentDigest(item),
              },
            });
          })
        );

    return client
      .api(`/sites/${host}:/${site.relativePath}`)
      .get()
      .then((data) => {
        // Decompose the id into its parts. We don't know what arg3 points to...
        const [host, siteId, arg3] = data.id.split(",");

        // Create a site node
        createNode({
          site: data,
          id: createNodeId(siteId),
          parent: null,
          internal: {
            type: "SharePointSite",
            content: JSON.stringify(data),
            contentDigest: createContentDigest(data),
          },
        });

        return Promise.all(site.lists.map((list) => processList(siteId, list)));
      });
  };

  Promise.all(sites.map(processSite)).catch(console.error).finally(callback);
};
