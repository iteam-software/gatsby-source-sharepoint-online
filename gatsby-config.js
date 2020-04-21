require("dotenv").config();

module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-sharepoint-online",
      options: {
        host: "iteamnm.sharepoint.com",
        appId: process.env.AppId,
        appSecret: process.env.AppSecret,
        tenantId: process.env.TenantId,
        sites: [
          {
            name: "gatsby-source-sharepoint-online",
            relativePath: "sites/gatsby-source-sharepoint-online",
            lists: [
              {
                title: "People",
                fields: ["Person", "Apply", "Office"],
              },
            ],
          },
        ],
      },
    },
  ],
};
