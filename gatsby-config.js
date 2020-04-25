require("dotenv").config();

module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-sharepoint-online",
      options: {
        host: process.env.Host,
        appId: process.env.AppId,
        appSecret: process.env.AppSecret,
        tenantId: process.env.TenantId,
        sites: [
          {
            name: "TestSharePointSite",
            relativePath: "sites/gatsby-source-sharepoint-online",
            lists: [
              {
                title: "People",
                fields: ["Person", "Workplace"],
              },
            ],
          },
        ],
      },
    },
  ],
};
