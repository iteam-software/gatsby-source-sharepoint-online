require("dotenv").config();

module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-sharepoint-online",
      options: {
        site: "df6437cc-b0e5-4f13-ba4b-4c6bb14b0bfa",
        appId: process.env.AppId,
        appSecret: process.env.AppSecret,
        tenantId: process.env.TenantId,
      },
    },
  ],
};
