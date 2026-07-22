---
title: "Introducing FitGPT"
slug: "introducing-fitgpt"
description: "TL;DR 📚\nI've launched https://fitgpt.xyz, which offers an AI-powered Fitness Coach capable of creating specialized workout routines and personalized meal plans tailored to your current fitness level and future goals.\nIntro 👋\nAre you feeling bored w..."
publishedAt: "2023-03-06T14:06:14.433Z"
readTimeInMinutes: 5
tags: ["next.js","side project","ai"]
coverImage: "/blog/introducing-fitgpt/cover.png"
draft: false
---
# TL;DR 📚

I've launched [**https://fitgpt.xyz**](https://fitgpt.xyz), which offers an AI-powered Fitness Coach capable of creating specialized workout routines and personalized meal plans tailored to your current fitness level and future goals.

# Intro 👋

Are you feeling bored with your fitness and nutrition routine? If your workout regimen has lost its excitement and your meals have become repetitive, it may be time to switch things up.

Introducing [FitGPT](https://fitgpt.xyz)! Your AI-Powered Fitness Coach.

[FitGPT](https://fitgpt.xyz) is a fitness companion that tailors to your unique needs, no matter where you are on your fitness journey. By leveraging the power of AI, [FitGPT](https://fitgpt.xyz) creates personalized workout routines and meal plans that take into account your current fitness level and goals, ensuring that you get the most out of your fitness routine.

I'm building [FitGPT](https://fitgpt.xyz) to solve two specific issues I saw I was personally having with my Fitness journey.

%[https://twitter.com/thealexkates/status/1632378237690032136] 

To start, I have over 10 years of experience building my own fitness routines and have experimented with numerous workout programs over time. However, I found that my routine became stagnant and I wanted a simple way to create fresh routines on demand.

Additionally, I am passionate about nutrition and think it's super important to be consistent. I aim to eat whole, nutritious foods for at least 6 days out of the week. However, I have become increasingly bored with my current meal options.

Whenever I sought out new recipes on the internet, I found myself sifting through excessive blog posts and advertisements before finally arriving at the recipe. It was simply frustrating.

This is why I'm building [FitGPT](https://fitgpt.xyz).

# Features 🔍

[FitGPT](https://fitgpt.xyz) is just launching and already has several important features to help you on your fitness journey including ...

## Routines 💪

The "Create Routines" feature in [FitGPT](https://fitgpt.xyz) makes it easier than ever for users to create personalized workout routines tailored to their specific needs and goals. This feature uses the same AI technology powering ChatGPT, which considers the user's fitness experience, equipment availability, time constraints, and workout goals. [FitGPT](https://fitgpt.xyz) combines details about your current fitness level with AI to generate a custom workout plan that is both effective and enjoyable.

Not only does the "Create Routines" feature generate a fresh workout routine every time, but it also provides the user with a beautifully formatted plan that is easy to follow. The workout plan includes a calorie estimate along with clear instructions on each exercise and the number of sets and reps to complete.

Users can save their workout routines and access them at any time, making it easy to stay on track with their fitness goals. With this feature, users can take the guesswork out of creating a workout routine and focus on getting the most out of their workouts.

## Meals 🍜

[FitGPT](https://fitgpt.xyz)'s "Generate Meals" feature is an awesome tool for anyone looking to make healthy eating a breeze. It considers your dietary preferences, nutritional requirements, and cooking abilities to develop a custom meal plan just for you.

When you use the "Generate Meals" feature, it asks you a few questions like "What ingredients do you have?" and "What are your dietary restrictions?" It uses your answers to create meals that are not only delicious but also personalized to your needs. It takes into account factors like food allergies, dietary preferences, and calorie goals to develop dishes that are both satisfying and healthy.

One of the greatest benefits of the "Generate Meals" feature is its ability to eliminate the stress of meal planning. With this tool, you can access on-demand meals that are tailored to your dietary requirements and preferences. You'll get step-by-step instructions, an ingredient list, and calorie and macro estimates. Whether you're looking for breakfast, lunch, or dinner ideas, [FitGPT](https://fitgpt.xyz) has got you covered with healthy, personalized meals at your fingertips.

# Technology 🤖

[FitGPT](https://fitgpt.xyz) is powered by some of my favorite web development technologies. It's been so fun diving deep into all of these different technologies.

## [Open AI](https://platform.openai.com/docs/introduction)

At the heart of [FitGPT](https://fitgpt.xyz) is the integration with Open AI. Powered by the new [gpt-3.5-turbo model](https://openai.com/blog/introducing-chatgpt-and-whisper-apis), [FitGPT](https://fitgpt.xyz) is able to create personalized routines and meals nearly instantaneously.

## [Vercel](http://vercel.com)

Vercel is the platform of choice for [FitGPT](https://fitgpt.xyz). It provides build, deployment, hosting, environment management, API management, and so much more. I even upgraded to the [Pro Plan](https://vercel.com/pricing) for the extra bandwidth and function requests.

## [Next.js](https://nextjs.org/)

I absolutely love Next.js. I think it's the best web development framework I've ever seen. [FitGPT](https://fitgpt.xyz) is using [Next.js 13](https://nextjs.org/blog/next-13) and utilizes several new features including the new next/image and next/link.

## [NextAuth.js](https://next-auth.js.org/)

Authentication can be a real bear when spinning up a new project. NextAuth.js makes it super easy to get going, and it lets me own my Auth data. I'm using the DynamoDB provider along with the Google adapter, with plans to introduce other ways to login in the future.

## [TypeScript](https://www.typescriptlang.org/)

Not much to say here other than it's 2023 and I've been using TypeScript by default for about 2 years.

## [DynamoDB](https://aws.amazon.com/dynamodb/)

I love, love, love DynamoDB, especially single-table design. I can't overstate how much simpler it is to store data for a transactional-based web application.

%[https://twitter.com/thealexkates/status/1630634315909398528] 

## [Tailwind CSS](https://tailwindcss.com/)

Tailwind CSS is a must-have for me when it comes to UI development.

## [DaisyUI](https://daisyui.com/)

I just discovered DaisyUI and fell in love with it. Simply put, it's delightful to work with. With DaisyUI, I feel like I have all of the power with Tailwind CSS plus some really awesome pre-built components.

# Outro

So, to sum it up, [FitGPT](https://fitgpt.xyz) is the ultimate fitness companion that is perfect for anyone at any point in their fitness journey. Using AI, [FitGPT](https://fitgpt.xyz) creates personalized workout plans and meal ideas based on your fitness level and goals, making sure you get the most out of your fitness journey.

I hope you try [FitGPT](https://fitgpt.xyz) and find it as useful as it has been for me!
