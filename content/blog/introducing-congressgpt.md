---
title: "Introducing CongressGPT"
slug: "introducing-congressgpt"
description: "TL;DR\nFor the Hashnode AI For Tomorrow Hackathon, I launched CongressGPT to help us finally understand what Congress is actually doing.\nCongressGPT lets users have natural language conversations with the latest bills from the United States House of R..."
publishedAt: "2024-07-28T21:27:32.669Z"
readTimeInMinutes: 2
tags: ["aifortomorrow","hashnode","next.js"]
coverImage: "/blog/introducing-congressgpt/cover.png"
draft: false
---
## TL;DR

For the [Hashnode AI For Tomorrow Hackathon](https://hashnode.com/hackathons/ai-for-tomorrow), I launched [CongressGPT](https://congressgpt.app) to help us finally understand what Congress is actually doing.

[CongressGPT](https://congressgpt.app) lets users have natural language conversations with the latest bills from the United States House of Representatives and Senate. It uses Vercel's Cron and Supabase's RAG capabilities to continuously update a vector database with new bills.

Keeping up with what Congress is doing is hard. The language used in the bills can be challenging to follow. CongressGPT makes it easy to ask questions and understand congressional bills.

It's more important than ever to stay informed about what our representatives are doing, and I hope CongressGPT helps you do just that.

## The Tech

### Next.js 14

This project uses several new features from Next.js and React, including the [app router](https://nextjs.org/docs/app), [dynamic metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata), [server components](https://nextjs.org/docs/app/building-your-application/rendering/server-components), and [suspense](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming).

### Supabase

Supabase is powering a majority of CongressGPT features including authentication, chat and vector storage and similarity searching. I've been using Supabase for several projects and really enjoying it.

### Govinfo API

The [Govinfo API](https://www.govinfo.gov/) provides an RSS feed that is updated daily with the latest bills introduced in the U.S. House of Representatives and Senate.

### Vercel

Vercel hosts the Next.js application and runs a nightly [cron job](https://vercel.com/docs/cron-jobs) to pull the latest Govinfo RSS entries, converting any new bills into a vector database.

### Shadcn/ui

The entire website is built using [shadcn/ui](https://ui.shadcn.com/) and [TailwindCSS](https://tailwindcss.com/).
