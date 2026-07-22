---
title: "Introducing Hashnode Roulette"
slug: "introducing-hashnode-roulette"
description: "TL;DR\nMy submission for the Hashnode/Netlify hackathon is Hashnode Roulette. \nMake your hashnode feed wonderful. Quickly find new stories and authors to follow using simple mobile gestures.\nHashnode Roulette is powered by the Netlify platform, built ..."
publishedAt: "2022-02-27T01:49:13.985Z"
readTimeInMinutes: 3
tags: ["netlify","netlifyhackathon","hashnode"]
coverImage: "/blog/introducing-hashnode-roulette/cover.png"
draft: false
---
# TL;DR
My submission for the Hashnode/Netlify hackathon is [Hashnode Roulette](https://hashnode-roulette.netlify.app/). 

Make your hashnode feed wonderful. Quickly find new stories and authors to follow using simple mobile gestures.

Hashnode Roulette is powered by the [Netlify](https://www.netlify.com/) platform, built using [NextJS](https://nextjs.org), and leverages the [Hashnode API](https://api.hashnode.com/).

# Intro
[Hashnode Roulette](https://hashnode-roulette.netlify.app/) is a Tinder-like web application that allows you to quickly browse through the top Hashnode articles and swipe them to react, follow, or open the article.

☝️ Swipe up to open the article in a new window.

👉 Swipe right to like the current article.

👇 Swipe down to follow the author.

👈 Swipe left to skip the article.

# Motivation
I personally think Hashnode is the best developer blogging platform in the market right now. I wanted to spend some time learning their GraphQL API. Also, I love working with NextJS and wanted to learn next-auth. Also, it's a lot of fun refreshing the page and getting random articles.

# How to use

## Login
Unfortunately, there isn't a way to sign in to Hashnode via OAuth yet. For now, use your Twitter credentials to sign in.

![Hashnode Roulette landing page](/blog/introducing-hashnode-roulette/image-01.png)

![Sign in with Twitter](/blog/introducing-hashnode-roulette/image-02.png)

## Settings
Certain gestures, like swipe-right and swipe-down, use GraphQL mutations via the Hashnode API. These mutations require you to use your API key. 

You'll need to grab your Hashnode API key. Head over to your Account Settings -> Developer -> Generate New Token.

![Generate new Hashnode API key](/blog/introducing-hashnode-roulette/image-03.png)

Enter your Hashnode API key and click Submit.

![Save your Hashnode API key](/blog/introducing-hashnode-roulette/image-04.png)

## Deck
The main page is called the Deck page. It has a random set of Hashnode articles as cards. These cards can be swiped in different directions based on how you want to react to the article.

☝️ Swipe up to open the article in a new window.

👉 Swipe right to like the current article.

👇 Swipe down to follow the author.

👈 Swipe left to skip the article.

![Hashnode Roulette deck page](/blog/introducing-hashnode-roulette/image-05.png)

# Tech stack
## Hosting
[Netlify](https://www.netlify.com/) is a platform for hosting full-stack web applications. Hashnode Roulette uses Netlify to host the NextJS web application.

## Web Framework
[NextJS](https://nextjs.org) is the React framework for building modern, production-ready applications. Hashnode Roulette is built on NextJS.

## Authentication
[next-auth](https://next-auth.js.org/) is the go-to authentication framework when working with NextJS. Hashnode Roulette uses the twitter-oauth module to allow users to authenticate using their Twitter credentials.

## UI Controls
[react-tinder-card](https://www.npmjs.com/package/react-tinder-card) is an NPM module that makes it easy to implement the swipe-card UI control. Hashnode Roulette uses this package to present the user with Hashnode articles that can be swiped.

## Data
[Apollo GraphQL Client](https://www.apollographql.com/docs/react/) is a great library to use in your React application to fetch data using GraphQL. Hashnode Roulette uses the useQuery and useMutation hooks to interact with the [Hashnode API](https://api.hashnode.com/).

# Outro
I hope you enjoy using Hashnode Roulette as much as I did building it! 
Let's connect on Twitter -> https://twitter.com/thealexkates
