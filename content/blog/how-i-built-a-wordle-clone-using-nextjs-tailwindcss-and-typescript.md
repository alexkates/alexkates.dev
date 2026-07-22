---
title: "How I Built a Wordle Clone Using Next.js, TailwindCSS, and TypeScript"
slug: "how-i-built-a-wordle-clone-using-nextjs-tailwindcss-and-typescript"
description: "TL;DR\n\nI built a Wordle Clone using Next.js, TailwindCSS, and TypeScript.\nSource code at https://github.com/alexkates/wordlol\nRunning at https://wordlol.vercel.app/\n\n\nIntroduction\nOver the past few months, Wordle has nearly consumed all of our Twitte..."
publishedAt: "2022-01-17T12:59:40.881Z"
readTimeInMinutes: 4
tags: ["100daysofcode","typescript","next.js","tailwind css"]
coverImage: "/blog/how-i-built-a-wordle-clone-using-nextjs-tailwindcss-and-typescript/cover.png"
draft: false
---
# TL;DR
- I built a Wordle Clone using [Next.js](https://nextjs.org/), [TailwindCSS](https://tailwindcss.com/), and [TypeScript](https://www.typescriptlang.org/).
- Source code at https://github.com/alexkates/wordlol
- Running at https://wordlol.vercel.app/


![image.png](/blog/how-i-built-a-wordle-clone-using-nextjs-tailwindcss-and-typescript/image-01.png)

# Introduction 
Over the past few months, [Wordle](https://www.powerlanguage.co.uk/wordle/) has nearly consumed all of our Twitter feeds. The premise of the game is quite simple ...

1. A random 5 letter word is generated.
2. You have 6 attempts to guess it.
3. Letters in the correct location will show as green.
4. Letters in the incorrect location will show as yellow.

In this post, I'll show you how you can build a Wordle clone using Next.js, TailwindCSS, and TypeScript.

# Scaffold
In this section, let's scaffold our Next.js application with TypeScript and TailwindCSS.

Be sure to reference the following getting-started documentation.
1. https://nextjs.org/docs/getting-started
2. https://tailwindcss.com/docs/guides/nextjs

## Next.js w/ TypeScript
Scaffold a new Next.js application with TypeScript

```shell
npx create-next-app@latest --typescript
```

## TailwindCSS
Install and initialize Tailwind.

```shell
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Add the paths to all of your template files in your tailwind.config.js file.
```javascript
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}```

Add the Tailwind directives to your ./globals.css.
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Test everything
Run the development server to make sure everything is working.
```shell
npm run dev
```

# Build
In this section, let's build the core functionality of the Wordle game.

## Answers
The random answer generator is really just the `./pages/answers.json` file and a [getServerSideProps](https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props) function executed when requesting the index page. The answer is then injected into the Home component via its props.

```typescript
import answers from "./answers.json";

export const getServerSideProps: GetServerSideProps = async () => {
  const answer = answers[Math.floor(Math.random() * answers.length)];

  return { props: { answer } };
};

const Home: NextPage = ({
  answer,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
...
};
```

## Guessing
The Guessing component is a form that has a few validation rules
1. Allow submitting when a player types in exactly 5 characters.
2. Allow only lowercase letters.

These rules are enforced inside the `handleSubmit` and `handleChange` event handler functions.

You may have noticed that I'm passing in the guesses and setGuesses state variables here, commonly known as [Prop Drilling](https://www.geeksforgeeks.org/what-is-prop-drilling-and-how-to-avoid-it/)

While there are a few ways to make this better e.g., [React useContext](https://reactjs.org/docs/context.html) and/or [React useReducer](https://www.w3schools.com/react/react_usereducer.asp), I'm also a fan of keeping things simple until they aren't anymore.

```typescript
import { useState } from "react";

export interface FormProps {
  guesses: string[];
  setGuesses: (guesses: string[]) => void;
}

const Form: React.FC<FormProps> = ({ guesses, setGuesses }: FormProps) => {
  const [guess, setGuess] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (guess.length !== 5) {
      return;
    }

    setGuesses([...guesses, guess]);
    setGuess("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(event.target.value.replace(/[^a-zA-Z]/g, "").toLowerCase());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="text-center border-2 border-gray-400 p-2 m-2 text-3xl"
        type="text"
        onChange={handleChange}
        maxLength={5}
        value={guess}
        placeholder="Enter your guess"
        required
      />
    </form>
  );
};

export default Form;

```

## Guesses
We need a way to display the player's guesses and correctly show their results. All of this is contained in the `./components/guesses.tsx` component.

The majority of the complexity is in the `getLetterBackgroundColor` function, which is responsible for highlighting each letter of each guess with the correct color based on the answer.

```typescript
export interface GuessesProps {
  guesses: string[];
  answer: string;
}

const getLetterBackgroundColor = (
  guess: string,
  index: number,
  answer: string
): string => {
  if (answer[index] === guess[index]) {
    return "bg-green-300";
  }

  const countOfLetterOccuringInAnswer = answer
    .split("")
    .filter((letter: string) => letter === guess[index]).length;

  const countOfLetterOccuringInGuessBeforeCurrentIndex = guess
    .slice(0, index)
    .split("")
    .filter((letter: string) => letter === guess[index]).length;

  if (
    answer.includes(guess[index]) &&
    countOfLetterOccuringInAnswer >
      countOfLetterOccuringInGuessBeforeCurrentIndex
  ) {
    return "bg-yellow-300";
  }

  return "bg-gray-300";
};

const Guesses: React.FC<GuessesProps> = ({ guesses, answer }) => {
  return (
    <ol className="m-4">
      {guesses.map((guess, guessIndex) => (
        <li key={guessIndex} className="grid grid-cols-5">
          {guess.split("").map((letter, letterIndex) => (
            <span
              key={letterIndex}
              className={`${getLetterBackgroundColor(
                guess,
                letterIndex,
                answer
              )} h-12 w-12 text-2xl flex border-2 border-gray-300 p-1 m-1 box-border justify-center items-center`}
            >
              {letter}
            </span>
          ))}
        </li>
      ))}
    </ol>
  );
};

export default Guesses;

```

## Game Over
The `./components/gameOver.tsx` component is responsible for displaying the results to the player.

Notice the `./components/guesses.tsx` re-use in here versus `./pages/index.tsx`. This is enabled by passing in the `children` prop value and rendering it. 

```typescript
import Guesses from "./guesses";
import Link from "next/link";

export interface GameOverProps {
  answer: string;
  guesses: string[];
}

const GameOver: React.FC<GameOverProps> = ({ answer, guesses, children }) => {
  return (
    <div className="grid place-items-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">{children}</h1>
        <h2>
          The answer was <span className="font-bold">{answer}</span>
        </h2>
        <Guesses guesses={guesses} answer={answer} />
        <Link href="/">
          <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Play Again
          </a>
        </Link>
      </div>
    </div>
  );
};

export default GameOver;

```

# Summary
If you made it this far, chances are you are really close to having your own Wordle clone!  Don't forget to push it to https://vercel.com/ so you can share it with your friends :)

If you found this useful, please like and share. Also, follow me at https://twitter.com/thealexkates
