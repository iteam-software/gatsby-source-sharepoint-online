require("dotenv").config();

module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-sharepoint-online",
      options: {
        host: "westloan.sharepoint.com",
        appId: process.env.AppId,
        appSecret: process.env.AppSecret,
        tenantId: process.env.TenantId,
        sites: [
          {
            name: "GatsbySourceTest",
            relativePath: "sites/GatsbySourceTest",
            lists: [
              {
                title: "People",
                fields: ["Person", "Apply", "Office"],
              },
            ],
          },
          {
            name: "Tech Team",
            relativePath: "sites/TechTeam",
            lists: [],
          },
        ],
      },
    },
  ],
};
