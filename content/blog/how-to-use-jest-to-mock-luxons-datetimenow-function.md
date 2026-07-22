---
title: "How to Use Jest to Mock Luxon's DateTime.now Function"
slug: "how-to-use-jest-to-mock-luxons-datetimenow-function"
description: "Ever try to use test-driven development when working with Luxon's DateTime.now() method and need to use the expected current timestamp in your business logic?\nIn this post, we are going to look at why business logic that depends on the current date a..."
publishedAt: "2022-01-23T21:11:47.294Z"
readTimeInMinutes: 3
tags: ["jest","tdd (test-driven development)"]
coverImage: "/blog/how-to-use-jest-to-mock-luxons-datetimenow-function/cover.png"
draft: false
---
Ever try to use test-driven development when working with Luxon's DateTime.now() method and need to use the expected current timestamp in your business logic?

In this post, we are going to look at why business logic that depends on the current date and time is complex, and how you can use Jest to simplify things.

# The Problem
Imagine that you are maintaining a NodeJS application that depends on Luxon and you practice test-driven development. Along comes a requirement that is dependent on the current date and time. In other words, `DateTime.now()`.

If you tried to use Luxon's default DateTime.now() function in your tests, you will quickly find that it's difficult to set up proper test data and assertions. This is due to the coupling between the tests and the actual current time. 

The crux of the problem is that your test code will execute at a different day and time than your code under test. You might see this arise if your tests run on an integration server and run close to midnight. You may also see this when running tests locally and needing millisecond-level precision.

# Jest to the Rescue
As TDD practitioners, we know it's always a good thing to fake integration points. This is true for network calls, database read/writes, and even the system clock! 

Let's dive deeper into how you can leverage Jest to fake Luxon's default DateTime.now() function so we can assert on an expected current time.

First, let's take a look at a very simple system under test (SUT).

```typescript
import { DateTime } from 'luxon';

export const doSomethingThatDependsOnDateTimeNow = () => DateTime.now();
```
Nothing special here, just a simple function that returns Luxon's `DateTime.now()` result.

Now let's dive into the unit test.
```typescript
import { DateTime, Settings } from 'luxon';
import { doSomethingThatDependsOnDateTimeNow } from './doSomethingThatDependsOnDateTimeNow';

describe('Mocking DateTime.now with Luxon', () => {
  it('should return the mock DateTime', () => {
    // Arrange
    const expectedNow = DateTime.local(2021, 6, 1, 23, 0, 0);
    Settings.now = () => expectedNow.toMillis();

    // Act 
    const actual = doSomethingThatDependsOnDateTimeNow();

    // Assert
    expect(actual).toEqual(expectedNow);
  });
});
```

A lot going on here, so let's break it down.

First, we need to import `Settings` from Luxon, which is used to configure Luxon. We also import DateTime and our system under test (SUT), `doSomethingThatDependsOnDateTimeNow`.

Next, in the arrange section of the test, we create a new DateTime for the date 6/1/2021 at 11 pm EST. Then we override the `DateTime.Now()` function by assigning a new function `Settings.now` that returns our DateTime instead of the current time.

Finally, we invoke our SUT, capture the actual result, and assert that it is equal to our DateTime value.

# Wrapping Things Up
Using TDD and integrating with Luxon's DateTime.now() can be a bit complex at first, but I hope this guide helps you red-green-refactor your way through your next time-based application feature.

If you found this useful, please consider following me on Twitter https://twitter.com/thealexkates
