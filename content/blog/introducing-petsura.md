---
title: "Introducing Petsura"
slug: "introducing-petsura"
description: "TL;DR\nMy submission for the Hasura X Hashnode Hackathon is Petsura. \nHelp pets find their forever homes! Quickly scroll your feed of adoptable fluffs and share   on Twitter, send an email to the foster, or open the pet directly in Petfinder\n\nPetsura ..."
publishedAt: "2022-03-28T15:09:01.643Z"
readTimeInMinutes: 2
tags: ["hasura hackathon","hasura"]
coverImage: "/blog/introducing-petsura/cover.png"
draft: false
---
# TL;DR
My submission for the [Hasura X Hashnode Hackathon](https://townhall.hashnode.com/hasura-hackathon) is [Petsura](https://petsura.vercel.app/feed). 

Help pets find their forever homes! Quickly scroll your feed of adoptable fluffs and share   on Twitter, send an email to the foster, or open the pet directly in [Petfinder](https://www.petfinder.com/)


![Petsura Screenshot](/blog/introducing-petsura/image-01.png)

Petsura is powered by the [Hasura](https://hasura.io/) platform, built using [NextJS](https://nextjs.org) on [Vercel](https://vercel.com), and leverages the [Petfinder API](https://www.petfinder.com/developers/v2/docs/).

# Intro
[Petsura](https://petsura.vercel.app/feed) is an Instagram-like web application that allows you to quickly browse through the adoptable pets found on [Petfinder](https://www.petfinder.com/). When you find a fluff that sparks joy, you can share it on Twitter, contact the foster directly, or open the pet's full biography on Petfinder.

# Motivation
I have three rescue animals that live with me, and I think the world would be a better place if more animals were adopted. I wanted to make an app that was basically Instagram for adoptable pets. Also, I've been itching to play with Hasura and this hackathon was a perfect time.

# How to use
## Feed
The main page is called the [feed page](https://petsura.vercel.app/feed). It displays 25 random, adoptable pets from the Petfinder API. Scroll the feed until you find a pet that sparks joy. You can load more pets when you arrive at the end of the feed.

When you find that special pet, you can do three different actions.

🐦 Share the pet on Twitter.

📧 Email the foster to express interest in adopting.

🌐 Open the pet's full biography on Petfinder.

![Petsura actions including Tweet, Emails, and opening externally.](/blog/introducing-petsura/image-02.png)

# Tech stack
## Hosting
[Vercel](https://vercel.com/) is a platform for hosting full-stack web applications. Petsura uses Vercel to host the NextJS web application.

## Web Framework
[NextJS](https://nextjs.org) is the React framework for building modern, production-ready applications. Petsura is built on NextJS.

## Styles
[Tailwind CSS](https://tailwindcss.com/) CSS framework that lets you rapidly build beautiful web pages without leaving your HTML files. 

## API
[Hasura](https://hasura.io/) is a fully managed GraphQL platform. Petsura uses Hasura for its GraphQL API and also leverages the Action feature to integrate with an AWS APIGW.

![Hasura Action Screen Shot](/blog/introducing-petsura/image-03.png)


![Hasura GraphQL Query Screen Shot](/blog/introducing-petsura/image-04.png)

[Serverless](https://www.serverless.com/) allows you to rapidly develop serverless applications in AWS. Petsura uses Serverless to build the APIGW and Lambda that integrates the Hasura GraphQL API with the Petfinder Rest API.

[Apollo GraphQL Client](https://www.apollographql.com/docs/react/) is a great library to use in your React application to fetch data using GraphQL. Petsura uses the useQuery hook to interact with the [Hasura](https://hasura.io/).

# Outro
I hope you enjoy using Petsura as much as I did building it! 
Let's connect on Twitter -> https://twitter.com/thealexkates
