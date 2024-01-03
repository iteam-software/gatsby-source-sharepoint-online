import { createClient } from "./client.js";
import Resource from "./resource.js";

/**
 * @typedef {import('gatsby').SourceNodesArgs} Helpers
 */

/**
 * Generates Gatsby source nodes attached to a Sharepoint Online tenant.
 * @param {Helpers} helpers Gatsby Node Helpers.
 * @param {any} config Config object provided in the plugin config.
 */
export const sourceNodes = async (helpers, config) => {
  const { reporter } = helpers;
  const { host, sites = [], ...creds } = config;
  const client = createClient(creds);
  const listResource = new Resource("list");

  reporter.info(`Generating nodes from SharePoint.`);

  for (let i = 0; i < sites.length; i++) {
    const { lists = [] } = sites[i];
    const get = listResource.requestFactory(host, sites[i], client, helpers);

    reporter.info(`Working on site: ${sites[i].name}`);

    for (let j = 0; j < lists.length; j++) {
      const list = lists[j];

      reporter.info(`Sourcing nodes for list: ${list[i].title}`);

      if (!listResource.validate(list)) {
        reporter.error(`${list[i].title} is not a valid list.`);
        continue;
      }

      try {
        await get(list);
      } catch (err) {
        reporter.panicOnBuild(err);
      }
    }
  }
};

export const onPluginInit = ({ reporter }) => {
  reporter.info(`Hello World!`);
};
