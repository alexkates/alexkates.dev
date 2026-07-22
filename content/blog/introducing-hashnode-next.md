---
title: "Introducing Hashnode Next"
slug: "introducing-hashnode-next"
description: "TL;DR\nFor the Hashnode APIs Hackathon, I launched hashnode-next, a beautifully simple Hashnode starter kit powered by Next.js and shadcn/ui. Hashnode-next is the fastest way to go headless with Hashnode, enabling you to migrate your blog with just on..."
publishedAt: "2024-02-02T10:50:09.326Z"
readTimeInMinutes: 3
tags: ["apihackathon","hashnode","next.js"]
coverImage: "/blog/introducing-hashnode-next/cover.png"
draft: false
---
## TL;DR

For the [Hashnode APIs Hackathon](https://hashnode.com/hackathons/apihackathon), I launched [hashnode-next](https://hashnode-next.dev), a beautifully simple Hashnode starter kit powered by [Next.js](https://nextjs.org/) and [shadcn/ui](https://ui.shadcn.com/). Hashnode-next is the fastest way to go headless with Hashnode, enabling you to migrate your blog with just one click.

![Image of hashnode-next.dev landing page.](/blog/introducing-hashnode-next/image-01.png align="center")

Use the [Vercel deploy button](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Falexkates%2Fhashnode-next&env=HASHNODE_HOST&envLink=https%3A%2F%2Fapidocs.hashnode.com&project-name=blog&repository-name=blog&demo-title=hashnode-next&demo-description=The%20fastest%20way%20to%20go%20headless%20with%20Hashnode&demo-url=https%3A%2F%2Fhashnode-next.dev%2Fblog&demo-image=https%3A%2F%2Fhashnode-next.dev%2Fdemo.png) to deploy your own copy directly to your Vercel account, or start locally using the command below.

```bash
npm create-next-app -e https://github.com/alexkates/hashnode-next
```

## Some Background

> "Either write something worth reading or do something worth writing."  
> \- Benjamin Franklin

I've been a writer and fan of Hashnode since January 2022, when I published my first article. Since then, I have published over 25 articles with more than 50,000 total views.

![Image of my first Hashnode article.](/blog/introducing-hashnode-next/image-02.png align="center")

When [Hashnode Headless](https://hashnode.com/headless) became generally available, I was really excited to migrate [my blog](https://alexkates.dev/blog). This was right around the time that Next 14 was launching, and I knew this would be a fun project.

Then Hashnode announced the [Hashnode APIs Hackathon](https://hashnode.com/hackathons/apihackathon) and I knew it was the perfect time to open-source my blog template. I believed that creating a modern yet simple template that developers and bloggers could launch with just one click would be valuable.

## Getting Started

Migrating your blog to headless with hashnode-next is as easy as [deploying on Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Falexkates%2Fhashnode-next&env=HASHNODE_API_KEY,HASHNODE_API_URL,HASHNODE_HOST&envDescription=HASHNODE_API_URL%20is%20almost%20always%20https%3A%2F%2Fgql.hashnode.com.&envLink=https%3A%2F%2Fapidocs.hashnode.com&project-name=blog&repository-name=blog&demo-title=hashnode-next&demo-description=The%20fastest%20way%20to%20go%20headless%20with%20Hashnode&demo-url=https%3A%2F%2Fhashnode-next.dev%2Fblog&demo-image=https%3A%2F%2Fhashnode-next.dev%2Fdemo.png), adding a single environment variable, and clicking Create.

If you'd prefer to start locally, you can use the following command and setting your `.env.local`.

```bash
npx create-next-app -e https://github.com/alexkates/hashnode-next
```

Lastly, the [README](https://github.com/alexkates/hashnode-next/blob/main/README.md) is a great resource for Github ticket templates, contributing, and more.

## The Tech

### Next.js 14

Uses several of the newest capabilities from Next.js and React including [app router](https://nextjs.org/docs/app), [dynamic metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata), [server components](https://nextjs.org/docs/app/building-your-application/rendering/server-components), and [suspense](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming).

### Hashnode API

The [blog](https://apidocs.hashnode.com/#definition-Post), [tag](https://apidocs.hashnode.com/#definition-Tag), and [personal data](https://apidocs.hashnode.com/#definition-MyUser) GQL queries were primarily used to drive the `/blog` and `/about` pages. Additionally, the [GQL Playground](https://apidocs.hashnode.com/#introduction-item-1) was utilized to develop the GQL documents.

Recording analytics and pageviews was by far the trickiest part. I ended up using [Next.js redirects](https://github.com/alexkates/hashnode-next/blob/main/next.config.js) and Hashnode's [Google Analytics.](https://github.com/alexkates/hashnode-next/blob/main/src/components/analytics.tsx)

Lastly, [graphql-code-generator](https://github.com/dotansimha/graphql-code-generator) was employed to create TypeScript types from the schema.

### Vercel

Nothing crazy here... just your typical Vercel hosting and the awesome [Vercel Deploy Button](https://vercel.com/docs/deployments/deploy-button). This was my first time wiring up the Vercel deploy button, and I loved it.

### Shadcn/ui

The entire template is built using [shadcn/ui](https://ui.shadcn.com/) and [TailwindCSS](https://tailwindcss.com/), especially using the [Card](https://ui.shadcn.com/docs/components/card) component for each post and badge tile.

## Outro

Building [hashnode-next](https://www.hashnode-next.dev/) was my first attempt at creating an open-source project. I'm truly proud of the outcome, and I hope that some Hashnode bloggers looking to go headless and learn Next.js 14 will find this helpful.

If you found this helpful, I have a couple other free to use tools over at [alexkates.dev/projects](http://alexkates.dev/projects) and also consider connecting on [Twitter](https://twitter.com/thealexkates).
