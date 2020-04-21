<p align="center">
  <img alt="Gatsby Plugin: gatsby-source-sharepoint-online" src="docs/lockup.png" />
</p>

<h1 align="center">gatsby-source-sharepoint-online</h1>

<p align="center">
  <a href='https://opensource.org/licenses/MIT' alt='License: MIT'>
    <img src='https://img.shields.io/badge/License-MIT-yellow.svg'>
  </a>
  <a href="https://github.com/iteam-consulting/gatsby-source-sharepoint-online/workflows/Node.js">
    <img src="https://github.com/iteam-consulting/gatsby-source-sharepoint-online/workflows/Node.js%20CI/badge.svg" alt='Node.js CI'>
  </a>
  <a href='https://coveralls.io/github/iteam-consulting/gatsby-source-sharepoint-online?branch=master'>
    <img src='https://coveralls.io/repos/github/iteam-consulting/gatsby-source-sharepoint-online/badge.svg?branch=master' alt='Coverage Status' />
  </a>
</p>

Welcome! Use `gatsby-source-sharepoint-online` to access site data from a SharePoint tenant.

## Getting Started

1. Create an [Azure App Registration](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app) and [grant admin consent](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent) to the **Microsoft Graph: Sites.Read.All** application permission. You must use an application permission type for this plugin.
2. Create a secret in your App Registration for use with the plugin.
3. Use a package manager like `yarn` or `npm` to install the plugin.

**yarn**

```
yarn add gatsby-source-sharepoint-online
```

**npm**

```
npm i gatsby-source-sharepoint-online --save
```

4. Add the plugin config to `gatsby-config.js`

```
module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-sharepoint-online",
      options: {
        host: "<domain>.sharepoint.com",
        appId: <ApplicationId>,
        appSecret: <ApplicationSecret>
        tenantId: <TenantId>,
        sites: [
          {
            name: "CoolSharepointSite",
            relativePath: "sites/CoolSharepointSite",
            lists: [
              {
                title: "Heroes",
                fields: ["Name", "Power"],
              },
            ],
          },
        ],
      },
    },
  ],
};
```

**NOTE!** Do not put your secrets directly into this file if you intend to source control your application. In this repository we use `dotenv` to load config values from a `.env` file that is excluded from source control.
