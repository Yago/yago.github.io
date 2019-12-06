---
path: /blog/functional-patterns
title: "Functional Programming Patterns"
date: 2019-06-25 
type: post
---

Few months ago,  [Kyle Shevlin](https://kyleshevlin.com/just-enough-functional-programming-course-launch) did a great course on [egghead](https://egghead.io/courses/just-enough-functional-programming-in-javascript), followed by a series of [articles](https://kyleshevlin.com/just-enough-functional-programming-course-launch), about some basic concepts of functional programming in JavaScript. As an adept of this very popular paradigm, I found that even very basics, I'm not using all of them on a daily basis. So, here is **a quick recap of how cool those patterns are** and how they can help you improve your functional code.

## High order function
“The high order function (HOF) is a function that accepts a function as an argument and returns a new function 😅” Just read the example, it will directly make more sense to you.

```js
// Our high order function
const withCountLog = fn => {
  let count = 0;

  // Returns a new function
  return (...args) => {
    console.log(`Called ${++count} times`);
    return fn(...args);
  }
}

const add = (x, y) => x + y;
const countedAdd = withCountLog(add); // binding

countedAdd(52, 4); // Called 1 times
countedAdd(63, 5); // Called 2 times
countedAdd(74, 6); // Called 3 times
```


## Curried function
“A curried function is a higher-order function that returns a series of functions each accepting only one argument and only evaluating once we receive our final argument.” 

```js
const add = x => y => z => x + y + z;
console.log(add(1)(2)(3)); // 6
```

OK this example makes no sense at all. Now, if you start using it for **splitting your logic** into something simpler and more maintainable, it starts to make a lot of sense:

```js
// Our curried function
const getFromAPI = baseURL => endpoint => cb =>
  fetch(`${baseURL}${endpoint}`)
    .then(res => res.json())
    .then(data => cb(data))
    .catch(err => new Error(err));

// Main level
const getGithub = getFromAPI('https://api.github.com');

// Sub levels
const getGithubUsers = getGithub('/users');
const getGithubRepos = getGithub('/repositories');

getGithubUsers(data => console.log(data.map(user => user.login)));
```

Finally, the order of arguments are very important. Here we have `baseURL => endpoint => cb`  for the reason illustrated above. Always remind yourself this simple rule: **the order is from most specific to least specific argument**.

## Composition
This one can have its own article or even a series of articles, but I'm sure there are a lot of great resources out there. **Basically, it's a function used to *compose* other functions in a specific order to return to desired output** .

```js
// Our composition helper
const compose = (...fns) => x => 
  fns.reduce((acc, fn) => fn(acc), x);

const lower = str => str.toLowerCase();
const sanitize = str => str.replace(/[^a-z0-9 -]/g, '');
const clean = str => str.replace(/\s+/gm, '-');

const slugify = compose(
  lower,
  sanitize,
  clean,
);

console.log(slugify('I love $$$ noodles')); // i-love-noodles
```

This way is much cleaner and more readable than something like `clean(sanitize(lower('My string')));`, especially with more complex structure. The order is also very important; in this example, put `sanitize` before `lower` and your `I` will simply disappear.

You can also use the kind-of `.map` approach:

```js
// Our refactored composition helper
const compose = x => ({
  map: f => compose(f(x)),
  end: () => x,
});

const lower = str => str.toLowerCase();
const sanitize = str => str.replace(/[^a-z0-9 -]/g, '');
const clean = str => str.replace(/\s+/gm, '-');

const slugify = str => compose(str)
  .map(lower)
  .map(sanitize)
  .map(clean)
  .end();

console.log(slugify('I love $$$ noodles')); // i-love-noodles
```

## Conclusion
As I said, simple concepts, but very helpful to produce any kind of functional code. It will also help you to maintain consistency across your code base if you choose this great paradigm.

---

*Supported with* 💛 *by [Antistatique](https://antistatique.net)*