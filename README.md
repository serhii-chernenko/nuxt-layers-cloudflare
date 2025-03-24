# Nuxt 3 Layers with Cloudflare Pages integration

This is an example repository that introduce DDD architecture via [Nuxt 3 Layers](https://nuxt.com/docs/getting-started/layers) 
with integrations of [`nitro-cloudflare-dev`](https://github.com/nitrojs/nitro-cloudflare-dev) module for development and production purposes via [Wrangler](https://www.npmjs.com/package/wrangler).

A similar repository but without the layers architecture is available here:
- Repo: https://github.com/serhii-chernenko/falling-hall-643e/
- URL: https://falling-hall-643e.pages.dev/

It has the same issues as the current one.

## Updates

### Fix for [Issue 1](#issue-1)

PR with fixes to the Nitro repository:
https://github.com/nitrojs/nitro/pull/3245

It allows to set a custom path of auto-generated `wrangler.json` file.

### Fix for [Issue 2](#issue-2) and [Issue 3](#issue-3)

https://github.com/nitrojs/nitro-cloudflare-dev/issues/57#issuecomment-2747722537

## Useful links

- [Nuxt Cloudflare Pages docs](https://developers.cloudflare.com/pages/framework-guides/deploy-a-nuxt-site/)
- [Cloudflare workers local development](https://developers.cloudflare.com/workers/local-development/)
- [Cloudflare D1 local development](https://developers.cloudflare.com/d1/best-practices/local-development/)

## Setup project

To setup current repository follow next step

1. Prepare project
    - Run the command `git clone git@github.com:serhii-chernenko/nuxt-layers-cloudflare.git`.
    - Install packages `npm i`.
2. Prepare Cloudflare instances:
    - Run `npx wrangler login` to connect your account.
    - Create a new D1 database `npx wrangler d1 create nuxt-layers-cloudflare`
    - Save the value of the `database_id` field for the next step.
3. Setup project:
    - Prepare `.env` file `cp src/apps/app/.env.example src/apps/app/.env`.
    - Insert the value of `database_id` (from the previous step) to the `DB_ITEMS_ID` env variable.
    - Build all layers `npm run dev:prepare`.
    - Build the end application `npm run build:app`. [Go to Suggestion 1](#suggestion-1)
    - Generate DB migrations `npm run db:generate`.
    - Run the end application `npm run dev:app`. [Go to Issue 1](#issue-1)
4. Use wrangler for dev preview and deploy
    - Run `npx wrangler pages deploy --cwd src/apps/app/dist`. [Go to Issue 2](#issue-2)
    - Run `npx wrangler pages dev --cwd src/apps/app/dist`. [Go to Issue 3](#issue-3)
  
## Suggestions

### Suggestion 1

Even for local development, I need the `wrangler.json` file. But it generates on a fly only on the `nuxt build` command. It'd be nice to trigger the generation for `nuxt dev` as well.

## Issues

### Issue 1

#### Error

DB connections error
```
Query: select "id", "name", "created_at" from "items"

ERROR  D1_ERROR: no such table: items: SQLITE_ERROR
```

#### Fix attempt

I tried to apply the migration by the command from the root directory:
```bash
npx wrangler d1 migrations apply DB_ITEMS --local -c src/apps/app/dist/_worker.js/wrangler.json
```
The output:
```
[ERROR] table `items` already exists at offset 13: SQLITE_ERROR
```
So, I'm really confused, why it says that the `items` table already exists but when I try to run development it says the opposite.

#### Solution

https://github.com/nitrojs/nitro/pull/3245

### Issue 2

URL: https://nuxt-layers-cloudflare.pages.dev/

Result is the same as locally — "Internal server error" but in the production mode the root cause is not displayed:
![image](https://github.com/user-attachments/assets/a163c2b8-0ed6-4031-bbcf-7b25ed738401)

Let's go the next step to debug the issue.

#### Solution

https://github.com/nitrojs/nitro-cloudflare-dev/issues/57#issuecomment-2747722537

### Issue 3

Running output:
```
Your worker has access to the following bindings:
- D1 Databases:
  - DB_ITEMS: nuxt-layers-cloudflare (53f8****-****-****-****-********6160) [simulated locally]
```

Error when the page is opened in the browser by pressing `b`:
```
✘ [ERROR] TypeError: Cannot read properties of undefined (reading 'env') at useDatabaseItems
```

#### Solution

https://github.com/nitrojs/nitro-cloudflare-dev/issues/57#issuecomment-2747722537

## Short summary

It's impossible to develop project locally with D1 instance. It doesn't work via `wrangler pages dev` and `wrangler pages deploy` as well.