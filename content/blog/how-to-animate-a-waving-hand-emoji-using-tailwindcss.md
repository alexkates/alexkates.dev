---
title: "How to Animate a Waving Hand Emoji Using TailwindCSS"
slug: "how-to-animate-a-waving-hand-emoji-using-tailwindcss"
description: "I recently spent time polishing the mobile responsiveness for my personal site, https://alexkates.dev, and I wanted to add a little animation flair to some empty space next to my Hero introduction. \n👋 TL;DR 👋\nI made the waving hand emoji actually w..."
publishedAt: "2022-01-25T22:57:37.088Z"
readTimeInMinutes: 2
tags: ["tailwind css","2articles1week"]
coverImage: "/blog/how-to-animate-a-waving-hand-emoji-using-tailwindcss/cover.png"
draft: false
---
I recently spent time polishing the mobile responsiveness for my personal site, [https://alexkates.dev](https://alexkates.dev), and I wanted to add a little animation flair to some empty space next to my Hero introduction. 

# 👋 TL;DR 👋
I made the waving hand emoji actually wave using TailwindCSS. 
You can [find the source code here](https://github.com/alexkates/waving-hand-tailwind).
![Alt Text](/blog/how-to-animate-a-waving-hand-emoji-using-tailwindcss/image-01.gif)

# Setup
The majority of the Setup is taken [from the TailwindCSS setup guide](https://tailwindcss.com/docs/guides/create-react-app). The most jarring part is [the use of Craco](https://github.com/gsoft-inc/craco) instead of the standard react-scripts.

## Scaffold CRA, TailwindCSS and Craco
```shell
npx create-react-app waving-hand-tailwind

cd waving-hand-tailwind

npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9

npm install @craco/craco
```

## Update package.json
![Alt Text](/blog/how-to-animate-a-waving-hand-emoji-using-tailwindcss/image-02.png)

## Configure craco.config.js
![Alt Text](/blog/how-to-animate-a-waving-hand-emoji-using-tailwindcss/image-03.png)

## Configure tailwind.config.js
![Alt Text](/blog/how-to-animate-a-waving-hand-emoji-using-tailwindcss/image-04.png)

## Include TailwindCSS in index.css
![Alt Text](/blog/how-to-animate-a-waving-hand-emoji-using-tailwindcss/image-05.png)

# Build

## Create the Wave Animation

Let's break down what is happening here.

We are extending the TailwindCSS configuration in order to bake in a new animation.

The keyframes section defines exactly how the animation transforms during the lifetime of the animation. At 0%, rotate 0 degrees; at 15%, rotate 14 degrees, etc.

Finally, the animation definition for `wave` to use the wave keyframes, transform for 1.5s, and loop infinitely.

![Alt Text](/blog/how-to-animate-a-waving-hand-emoji-using-tailwindcss/image-06.png)

## Update App.js

Lastly, let's add a new span with the hand emoji.

![Alt Text](/blog/how-to-animate-a-waving-hand-emoji-using-tailwindcss/image-07.png)

## Start Your App
```shell
npm start
```

![Alt Text](/blog/how-to-animate-a-waving-hand-emoji-using-tailwindcss/image-01.gif)

Thanks for reading! If you found this useful feel free to follow [me on Twitter](https://twitter.com/thealexkates).
