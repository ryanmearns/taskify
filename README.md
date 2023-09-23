# Taskify

This is a demo using [Next.js](https://nextjs.org/), [Drizzle ORM](https://orm.drizzle.team), [Resend](https://resend.com/) and [Next Auth](https://next-auth.js.org) with server-action middleware of an open-source todo app configured for a Postgres database.

## Get started

Run the following command:

```sh
git clone https://github.com/ryanmearns/taskify.git
cd taskify
pnpm i
pnpm create-secret
```

Add the secret to `.env` and create an API key for [Resend](https://resend.com/) to add to `.env`

or, deploy by clicking [here](https://vercel.com/new/clone?repository-url=https://github.com/ryanmearns/taskify&name=taskify&stores=%5B%7B%22type%22%3A%22postgres%22%7D%5D&repository-name=taskify&env=NEXTAUTH_SECRET,RESEND_API_KEY&root-directory=apps%2Fapp).

https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fexamples%2Ftree%2Fmain%2Fstorage%2Fpostgres-drizzle&project-name=postgres-drizzle
&repository-name=postgres-drizzle
&demo-title=Vercel%20Postgres%20%2B%20Drizzle%20Next.js%20Starter
&demo-description=Simple%20Next.js%20template%20that%20uses%20Vercel%20Postgres%20as%20the%20database%20and%20Drizzle%20as%20the%20ORM.
&demo-url=https%3A%2F%2Fpostgres-drizzle.vercel.app%2F
&demo-image=https%3A%2F%2Fpostgres-drizzle.vercel.app%2Fopengraph-image.png
&stores=%5B%7B%22type%22%3A%22postgres%22%7D%5D&

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `app`: a [Next.js](https://nextjs.org/) app
- `ui`: a React component library using Radix and Shadcn/UI
- `workshop`: `storybook` workshop in a [Next.js](https://nextjs.org/) app configured for quick design exploration
- `forms`: a form library with form components, `react-hook-form` and `@hookform/resolvers/zod`
- `emails`: a `react-email` with emails.
- `tailwind-config`: configuration for tailwindcss
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Build

To build all apps and packages, run the following command:

```
cd taskify
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd taskify
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd taskify
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
