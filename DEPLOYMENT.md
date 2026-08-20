# Deployment - Liwa Sport Club App

Owned and maintained by LINKVIVA (linkvivaevents.onmicrosoft.com).

This repository has two deployment targets.

| Target | Branch | Host | Access |
| --- | --- | --- | --- |
| Production preview | `main` | GitHub Pages | Public, no sign-in |
| Staging | `staging` | Azure Static Web Apps | LINKVIVA Microsoft 365 sign-in only |

Production keeps the existing GitHub Pages workflow, untouched. Staging is the
gated environment for sharing work in progress with clients and internal
reviewers.

---

## Status

Done, on the `staging` branch:

- [x] `staging` branch created from `main`
- [x] `staticwebapp.config.json` added, the sign-in gate and routing rules
- [x] `.github/workflows/azure-static-web-apps-staging.yml` added, the build
      and deploy pipeline
- [x] `docs/IT-AZURE-REQUEST.md` added, the handover for IT

Outstanding, and none of it happens in GitHub:

- [ ] Azure Static Web App created on the **Standard** plan and connected to
      this repository's `staging` branch
- [ ] Entra ID app registration, single tenant, with a client secret
- [ ] `AAD_CLIENT_ID` and `AAD_CLIENT_SECRET` set as app settings on the
      Static Web App
- [ ] Repository secret `AZURE_STATIC_WEB_APPS_API_TOKEN_STAGING` present
- [ ] Tenant ID written into `staticwebapp.config.json`, replacing
      `REPLACE_WITH_TENANT_ID`

The workflow fails until the deployment token exists. That is expected, not a
broken build.

## What to do next

1. Send `docs/IT-AZURE-REQUEST.md` to the IT Manager. It contains every Azure
   and Entra ID step, and lists the two values needed back.
2. When IT returns the tenant ID, replace `REPLACE_WITH_TENANT_ID` in
   `staticwebapp.config.json` on this branch and commit.
3. Re-run the failed workflow from the Actions tab.

The staging URL will then ask for a LINKVIVA Microsoft 365 account before it
serves anything.

---

## Notes for whoever maintains this

### The base URL differs between the two targets

`app.json` sets `experiments.baseUrl` to `/liwa-app`, which is correct for
GitHub Pages because the site is served from a subpath. Azure Static Web Apps
serves from the domain root, so the staging workflow clears that value at
build time. Verified: with the value left in place every asset resolves to
`/liwa-app/_expo/...` and 404s on Azure. Do not remove that step, and do not
change `app.json` to suit staging, or the Pages build breaks instead.

### Deep links

The app is a single page export (`app.json` sets `web.output` to `single`), so
paths like `/races` have no file of their own. GitHub Pages handles this with a
copied `404.html`. Azure handles it with the `navigationFallback` block in
`staticwebapp.config.json`, whose exclude list matches the real `dist` output:
`_expo/`, `assets/`, `favicon.ico`, `metadata.json`.

### Why not GitHub Pages for staging

Pages sites on a public repository are public. There is no way to put
Microsoft 365 sign-in in front of them. Azure Static Web Apps on the Standard
plan supports a custom Entra ID provider, which is what gates staging to
LINKVIVA staff. Custom authentication is not available on the Azure Free plan.

### The client secret expires

When it lapses, the staging site stops letting anyone in and the cause is not
obvious from the error. Whoever creates the secret should record the expiry
date somewhere the team will see it.
