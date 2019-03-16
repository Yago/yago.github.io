---
path: /blog/recursion-real-life-problem-solver
title: "Recursion, Real Life Problem Solver"
date: 2018-10-11
type: post
---

**Small disclaimer**: [I’m an Impostor](https://davidwalsh.name/impostor-syndrome) and I’m not the nerdiest math engineer to speak about recursion which is such a heavy topic. Instead, **I will speak about my experience and how recursion can help solve “cleanly“ daily problems**.

Currently, **functional programming is maybe the most used paradigm** in the JavaScript community. It was not always so, but since few years with the ES6+ language overhaul and some popular libraries like React, Lodash, Redux, etc, it became more and more usual to adopt it. I will not write here about how this paradigm is great in many ways, there are a lot of great articles about it. Anyway, **in a functional world, recursion is a very obvious and powerful tool to have in our toolbox.**

## Simple, but soooo complex
Yep.

Few years ago, the first time I encounter a recursion it was with a more experienced dev colleague who gave me that solution to solve a particular situation that I had. I was like: “Great! but wait… what?!?”

Basically, **recursive function is a function which calls itself**. That’s the simple definition, but if you want a deeper explanation, there is the [Wiki page](https://en.wikipedia.org/wiki/Recursion_(computer_science)). Same disclaimer than before, I’m just a daily JavaScript developer, not a mathematician. So yes, **algorithms are mostly based on recursive methods, but that’s all I know about this topic**.

**The problem with recursive functions is to be hable to understand them**. It’s a bit like loops, but only for the “and again! and again! and again! ….” part. So yes, you will quickly have a lot of `console.log` everywhere, without understanding much more what you are doing.

## The magic recipe
To code a nice recursive function, you must pay attention to the following points if you don’t want to spend a lifetime in a try-fail loop:

 - The **recursion** (no shit): when the method will call itself.
 - Proper **conditions**: to define when it returns things or not in order to prevent failure.
 - **Pureness**: first and second rule of the functional programming club

For example,  if you want to get the index of a specific array value:

```js
const numbers = [1,2,3,4];

const indexOf = (value, array, i = 0) => {
  // value, array and i exist only in this instance, so pure

  // Condition 1: Found it !
  if (array[i] === value) return i;

  // Condition 2: Sorry nothing founded
  if (undefined === array[i]) return;

  // Recursion: Keep going
  return indexOf(value, array, i + 1);
};

console.log(indexOf(3, numbers)); // 2
console.log(indexOf(5, numbers)); // undefined
```

*Yes, I’m aware that `numbers.indexOf(3)` is a faster an cleaner way to do it, not that a noob…*

## Paginated API
This first example is a recurring one. Very often, **when you want to call some data from an API, for some reason you want them all at once**. So you will fetch the first endpoint, get the data, call the next “page” and so on until there is no more “page” to fetch.  It’s very dangerous and stupid if there is a lot of “pages” and anything went wrong in the process, but that’s your call at the end ¯\_(ツ)_/¯

In this example, we will use [SWAPI](https://swapi.co/) to get all the universe’s species:
```js
import axios from 'axios';

const swapiFetch = ({ url, payload = {}, resolver = null }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(res => {
        const data = res.data;
        const updatedPayload = [...payload, ...data.results];

        if (data.next) {
          swapiFetch({
            url: data.next,
            payload: updatedPayload,
            resolver: resolver || resolve
          });
        } else {
          if (resolver) resolver(updatedPayload);
          resolve(updatedPayload);
        }
      })
      .catch(err => {
        console.error('error', err);
      });
  });
};

swapiFetch({ url: 'https://swapi.co/api/species/?format=json' })
  .then(data => {
    data.forEach(item => console.log(item.name));
  });
```
[📦 Play with the CodeSandbox example!](https://codesandbox.io/s/0x06q4601l)

Because we are calling an asynchronous method through [`axios`](https://github.com/axios/axios), we must use `Promise` to solve this case. **So each time the method calls a new endpoint, it will add the response data to the payload and continue until there is no more endpoint to call.** To resolve the initial Promise, we can pass the `resolve` function as a argument. (Feel free to comment if you have a better way to do it). Even if it’s not the nicest way to do it, **it’s a good example of recursion and promises**.

## Secret Santa
Each Christmas (not the most inclusive example I know), we are doing the secret Santa in my family. In order to not have to cut small pieces of paper, put them in a hat and draw yourself at the end, I directly code a small JS script to do it using text messages.

So basically **I have an array of peoples** with their names and phone number and **I must assign a name to each number**  which is not itself.  I tried many approaches and the most recent one was to combine the famous The Fisher-Yates (aka Knuth) shuffle algorithm with a small validation method to check that no name was assigned to it own phone number.

Finally, it looks like:
```js
class SecretSanta {
  /**
   * Creates an instance of SecretSanta.
   * @param {Array} array - array of people [{ name, phone },...]
   */
  constructor(array) {
    this.array = array;
  }

  /**
   * The Fisher-Yates (aka Knuth) shuffle algorithm
   * http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
   * inspired by Daplie/knuth-shuffle
   * 
   * @param {Array} array - array to randomize
   * @returns {Array} array randomized
   */
  knuth (array) {
    let index = array.length;

    // While there remain elements to shuffle...
    while (0 !== index) {

      // Pick a remaining element...
      const randomIndex = Math.floor(Math.random() * index);
      index -= 1;

      // Swap it with the current element.
      [array[index], array[randomIndex]] = [array[randomIndex], array[index]]
    }

    return array;
  }


  /**
   * Validate permutation of randomized array
   * 
   * @param {Array} a - reference array
   * @param {Array} b - randomized array
   * @param {string} key - comparison key (f.ex `name`)
   * @returns {boolean}
   */
  validate (a, b, key) {
    return !a.find((item, i) => item[key] === b[i][key]);
  }


  /**
   * Build randomized assigned people array
   * 
   * @returns {Array} 
   */
  build () {
    let randomized = this.knuth([...this.array]);

    while (!this.validate(this.array, randomized, 'name')) {
      randomized = this.knuth([...this.array])
    }

    const validated = this.array.map((person, i) => ({
      from: person.name,
      phone: person.phone,
      to: randomized[i].name,
    }));

    return validated;
  }
}
```
*Full project on [GitHub](https://github.com/Yago/SecretSanta).*

It’s not a single recursive function, but more a **mix of multiple methods using mainly the `while` operator**. Remember, you can surely build complex recursive methods, but  I you want to understand it months or even years later, you better have to keep things simple and understandable. 

## Deep Sanitizer
Not longer than a week ago, I face some issue of retrieving unpredictable data out of a headless CMS through Gatsby GraphQL query language.  Because in this big data object I can only predict the parent attribute and not all the nested sub-attributes, **my solution was to flag those parents and `JSON.stringify` them with a recursive method.** They can be at any level, so I had to traverse the data response object, level by level, and stringify it when I found the right flag.

At the end, a simple traversing method, but not simple for me to write ^^’
```js
const object = {
  first: 1,
  second_toString: 2,
  thirdy: [
    {
      a: "foo",
      b_toString: 1
    },
    {
      a: "bar"
    }
  ]
};

// ⚗️ Our magic machinery 👇
const deepSanatizer = (obj, method) => {
  // process Array
  if (Array.isArray(obj)) {
    return obj.map(item => deepSanatizer(item, method));
  }

  // process Object and look for attribute name match
  if (typeof obj === 'object' && obj !== null) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = deepSanatizer(method(key, obj[key]), method);
      return acc;
    }, {});
  }

  return obj;
};

const sanitizedObject = (object, (key, value) => {
  if (key.includes('_toString')) return JSON.stringify(value);
  return value;
});
```
[📦 Play with the CodeSandbox example!](https://codesandbox.io/s/wq9roy2xy7)

**I still don’t run any performance tests to see if there are some less consuming approaches**, but it remains a good example of deep object traversing with recursion.

## Conclusion
I’m sure everybody who uses recursion weekly has a lot of good examples. **I encourage you to share your proudest recursive functions and discuss them with the community** to be more efficient each time you have to write one.

Honestly, it’s still hard and time consuming for me to write them. Maybe it’s because I’m not a proper engineer or maybe because it’s hard for everyone (reassure me please ^^’). Anyway, **it’s a very powerful way solve things and it will keep your code small and something, simple to read and to understand.**

---

*Supported with* 💛 *by [Antistatique](https://antistatique.net)*