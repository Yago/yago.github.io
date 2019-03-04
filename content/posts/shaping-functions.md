---
path: /blog/shaping-functions
title: "Shaping functions !"
date: 2018-11-28
type: post
---

We live in the era of JavaScript Functional Programming, but I still asked myself sometimes if my way of declaring function is the “good” one.  **It’s one of those early basic things that we learn first and that we are using all the time**, but without really knowing why and how it is so.

Since ES2015, I’m a big fan of minimal arrow functions like:
```js
const addition = (i, j) => i + j;
```

Still, it’s time for checking the basics and current status of functions creation ! *(And also if I’m not totally wrong about the default practice above)*

## Your options
I found a very interesting and only 10-year-old [Stack Overflow question](https://stackoverflow.com/questions/336859/var-functionname-function-vs-function-functionname)  about this subject and the following explanations are inspired by it. So in JavaScript, **there is more than 7 ways of creating functions** and I will present (almost) all of them.

### Brief
For each of the following examples, we are going to **create a pure function which will return the sum of all the arguments of type number** that we pass in.

### Function Declaration
Maybe the one that everybody learns first and very close to a lot of other programming languages:

```js
function sum() {
	return [...arguments].reduce(function (acc, n) {
		if (typeof n === 'number') return acc + n;
		return acc;
	}, 0);
}
```

> “A function declaration is processed when execution enters the context in which it appears, **before** any step-by-step code is executed.”

This is a very important point, because unless almost all of the following variants, here you can basically call a function **above** it’s declaration. Not the best practice from my point of view, but still.

```js
sum(31,7,4); // return 42

function sum() {
	return [...arguments].reduce(function (acc, n) {
		if (typeof n === 'number') return acc + n;
		return acc;
	}, 0);
}
``` 

Like almost anything in ES2015+, it’s block scoped. So it’s only available on its context (another function, condition statement, etc).

### Anonymous Function Expression
Very close to the “new” arrow function (see below), it consists of **assigning an anonymous method to a variable**. It’s evaluated when it’s reached in the step-by-step execution of the code, so don’t try to call it before as the previous example; it will return an `undefined function` error. 

```js
const sum = function () {
	return [...arguments].reduce(function (acc, n) {
		if (typeof n === 'number') return acc + n;
		return acc;
	}, 0);
}

sum(31,7,4); // return 42
``` 

— OK, but it will be hard to track errors because of the anonymous nature of your function, bla bla bla
— Wrong !

It has been the case in the old times, but since ES2015+ `sum.name` will return you `sum` and **not an empty string** like it was before. So there is less downsides of using classy Anonymous  Function Expression.

### Named Function Expression
It’s a combination the Function Declaration and Anonymous Function Expression. Named Function Expression or NFEs **solve the anonymous “issues”** back in the days, but has also the benefits of **providing a shorter method name in it context**, very useful for recursions.

```js
const sum = function sum() {
	return [...arguments].reduce(function (acc, n) {
		if (typeof n === 'number') return acc + n;
		return acc;
	}, 0);
}

sum(31,7,4); // return 42

// For recursion
person.communication.capabilities.greetings = greetings() {
	console.log('Hello you ! ❤️');
	greetings(); // Infinite greetings, yay !
};
``` 


### Arrow Function (ES2015+)
[SPOILER ALERT] My favorite:D

Simple, sober, clean, beautiful and so much more, this form of function creation is almost like the Anonymous Function Expression, **but without its own context**. It means that `this` will refer to it parent context.

Basic rule:
— Want a context (jQuery stuff) -> Anonymous Function Expression
— Don’t care -> Arrow Function

```js
const sum = (...args) => {
	return args.reduce((acc, n) => typeof n === 'number' ? acc + n: acc, 0);
}

sum(31,7,4); // return 42
```

### Accessor Function Initializer (getter, setter)
Not frequently used, it is still very useful **when you want to easily access an object’s attribute** and do something with it.

```js
const sum = {
  current: 0,
  get result() {
    return `The current result is ${this.current}`;
  },
  set add(n) {
    if (typeof n === 'number') this.current = this.current + n;
  }
};

sum.add = 31;
sum.add = 7;
sum.add = 4;
console.log(sum.result); // The current result is 42
```


### Method Declaration in Object Initializer (ES2015+)
A basic **object’s function attribute** with its shorter ES2015+ form.

```js
const calculator = {  
  sum(...args) {
	  return args.reduce((acc, n) => typeof n === 'number' ? acc + n: acc, 0);
  },
  
  sumOldSchool: function () {
    return [...arguments].reduce(function (acc, n) {
		  if (typeof n === 'number') return acc + n;
		  return acc;
	  }, 0);
  },  
};

calculator.sum(31, 7, 4);          // return 42
calculator.sumOldSchool(31, 7, 4); // return 42
```

### Constructor and Method Declarations in class (ES2015+)
With the popularity of [React](https://reactjs.org/) and the usage of **Class**, this form of function creation had become really popular.

```js
class Calculator {
  constructor(origin) {
    this.origin = origin;
  }
  
  sum(...args) {
	  return args.reduce((acc, n) => typeof n === 'number' ? acc + n: acc, this.origin);
  }
}

const Hal = new Calculator(0);
Hal.sum(31, 7, 4); // return 42
```


## Conclusion
We saw almost all the forms of function creation (sure it exists others) and we can all agreed that there is not one better than another, because **it depends on the context and the purpose**.

The way of **using by default the Anonymous Arrow Function** for standard creation is also not that bad. **The downside of anonymity of having difficulties to trace back an error is not more an issue from ES2015+**. Personally, I found this “new” form of function creation very elegant, minimalist and self-rewarding to use.

In a Functional world without any real downsides of preferring a form more than another, pick the nice one XD

```js
const delay = (time) => new Promise(resolve => setTimeout(resolve, time));

const thanks = async () => {
  console.log('👊');  
  await delay(500);
  console.log('🖐️');
  await delay(500);
  console.log('🎤');
};

thanks(); // 😘
```

---

*Supported with 💛 by [Antistatique](https://antistatique.net)*
