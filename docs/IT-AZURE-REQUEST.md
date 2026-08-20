# Request: Azure Static Web App for Liwa Sport Club app staging

To: IT Manager
From: Alaa Baroud
Repository: https://github.com/linkvivauae/liwa-app
Branch to deploy: staging

## Objective

Stand up a staging URL for the Liwa Sport Club app that is visible only to
LINKVIVA staff signed in with their Microsoft 365 account. The app currently
deploys to GitHub Pages, which is public and cannot be gated.

## Scope

Two things are needed, both outside GitHub:

1. An Azure Static Web App on the Standard plan, connected to the `staging`
   branch of the repository above.
2. An Entra ID app registration so sign-in is restricted to the
   linkvivaevents.onmicrosoft.com tenant.

The GitHub side is already prepared. The workflow and the routing and auth
config are committed on the `staging` branch.

## Part 1 - Create the Static Web App

1. Azure Portal, Create a resource, Static Web App.
2. Subscription and resource group: per LINKVIVA standards.
3. Name: `liwa-app-staging`.
4. Hosting plan: **Standard**. The Free plan does not support a custom Entra ID
   provider, so the sign-in gate will not work on Free.
5. Region: West Europe, unless there is a LINKVIVA preference.
6. Deployment details: source **GitHub**. Sign in and authorise, then select
   organisation `linkvivauae`, repository `liwa-app`, branch `staging`.
7. Build details: preset **Custom**. App location `dist`, API location blank,
   output location blank.
8. Create.

Azure will add its own workflow file to the repository. That file can be
deleted, because `azure-static-web-apps-staging.yml` already handles the build.
What matters is the repository secret Azure creates. Please rename it, or
recreate it, as:

`AZURE_STATIC_WEB_APPS_API_TOKEN_STAGING`

## Part 2 - Entra ID app registration

1. Entra ID, App registrations, New registration.
2. Name: `Liwa App Staging`.
3. Supported account types: **Accounts in this organizational directory only**
   (single tenant). This is what limits access to LINKVIVA staff.
4. Redirect URI, platform **Web**:
   `https://<the-static-web-app-hostname>/.auth/login/aad/callback`
5. Register, then note the **Application (client) ID** and the
   **Directory (tenant) ID**.
6. Certificates and secrets, New client secret. Note the value, it is shown
   once. Please set an expiry and record the renewal date.
7. Grant admin consent for the tenant if prompted.

## Part 3 - Static Web App configuration

In the Static Web App, under Settings, Environment variables (application
settings), add:

| Name | Value |
| --- | --- |
| `AAD_CLIENT_ID` | Application (client) ID from part 2 |
| `AAD_CLIENT_SECRET` | Client secret value from part 2 |

## What we need back

- The Static Web App hostname, for example
  `liwa-app-staging.azurestaticapps.net`
- The **Directory (tenant) ID**

The tenant ID has to be written into `staticwebapp.config.json` on the
`staging` branch, where it is currently a placeholder. Once we have it we will
commit the value and re-run the deployment.

## Notes

- Cost: Standard plan is billed per app per month plus bandwidth. One app.
- No custom domain is requested at this stage. The default
  `azurestaticapps.net` hostname is fine for staging.
- The client secret expires. Whoever owns this should diary the renewal, since
  an expired secret locks everyone out of the staging site.
