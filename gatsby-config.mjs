import { config } from "dotenv";

config();

export default {
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
            name: "GatsbySourceTest",
            relativePath: "sites/GatsbySourceTest",
            lists: [
              {
                title: "Testimonials",
                fields: ["LoanOfficer"]
              }
            ]
          }
        ]
      }
    }
  ]
};
