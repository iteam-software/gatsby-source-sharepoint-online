/**
 * @typedef {import('gatsby').SourceNodesArgs} Helpers
 * @typedef {import('@microsoft/microsoft-graph-client').Client} Client
 */

const generateListItemsUrl = (site, list, host) => {
  const base = `/sites/${host}`;
  return `${base}:/${site.relativePath}:/lists/${encodeURI(list.title)}/items`;
};

class Resource {
  /**
   * The type of this resource.
   * @type {'list' | 'drive'}
   */
  type;

  /**
   * Construct a resource.
   * @param {'list' | 'drive'} type The type of resource.
   */
  constructor(type) {
    this.type = type;

    if (type === "drive") {
      console.warn("Drives are not yet supported.");
    }
  }

  /**
   * Validates a resource item such as a list or drive definition.item && item.title
   * @param {any} item The item to validate.
   */
  validate(item) {
    const isValid = this.type !== "drive" || (item && item.title);
    if (!isValid) {
      console.warn(`Invalid resource definition: ${JSON.stringify(item)}`);
    }

    return isValid;
  }

  /**
   * Create a graph resource request.
   * @param {string} host The SharePoint host.
   * @param {any} site The site definition object.
   * @param {Client} graph The graph client.
   * @param {Helpers} helpers The Gatsby sourceNode API helpers.
   */
  requestFactory(host, site, graph, helpers) {
    return (item) => {
      const request = graph
        .api(generateListItemsUrl(site, item, host))
        .expand("fields");

      if (item.fields && Array.isArray(item.fields)) {
        request.expand(`fields($select=${item.fields.join(",")})`);
      }

      return {
        get: () => {
          return request.get().then((entry) => {
            entry.value.forEach((data) => {
              const normalizedListName = item.title.replace(" ", "");
              const type = `${site.name}${normalizedListName}ListItem`;

              helpers.actions.createNode({
                data,
                id: helpers.createNodeId(item.title + data.id),
                parent: null,
                children: [],
                internal: {
                  type,
                  content: JSON.stringify(data),
                  contentDigest: helpers.createContentDigest(data),
                },
              });
            });
          });
        },
      };
    };
  }
}

exports.Resource = Resource;