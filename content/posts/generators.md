---
path: /blog/generators
title: "Generators, the forgotten spec"
date: 2019-04-28
type: post
---

In a time just before the rise of the Promises, they came and fell to oblivion in a blink. Sadly nobody uses them, including me, but **generators are still in the game** (or not). Maybe you remember this strange `yield` expression or the tiny `*` declaration to transform your dummy function into a beautiful generator.

So yes, you can use `Promise`, `async/await`, almost any `Array`  methods or even recursions to do exactly what generators can do AND without the need of knowing them. It's a fact and I'm the first to approach my code this way, but maybe, we can take a closer look and try to use all the goodness that JavaScript as to offer, generators included.

## A simple form
Add a star (`*`) to your function declaration, multiple returns (`yield`) and voilà, you just have created a generator!

```js
const generator = function* () {
  yield 1;
  yield 2;
  yield 3;
};

const counter = generator();
console.log(counter.next()); // {value: 1, done: false}
console.log(counter.next()); // {value: 2, done: false}
console.log(counter.next()); // {value: 3, done: false}
console.log(counter.next()); // {value: undefined, done: true}
```

## A simple API
There are only three methods attached to the Generator's prototype :
- `.next()`: return the next “yielded” value
- `.return()`: return the given value and force the generator to end (kill switch)
- `.throw()`: throw an error to the generator and finish it in a more *errorish* way

## When to use it ?
Generators are very useful **when you need a method that you can replay on demand with some kind of inner evolution**. Something not as autonomous as a recursive method and not as dummy as a multi-parameters function. In summary, an iterator.

In the following example, we want to add a new item to our list when clicking on a button, but with a maximum of `10` items :

```js
const itemMaker = function* ({ max }) {
  for (let i = 0; i <= max; i++) {
    const item = document.createElement('li');
    item.innerHTML = `item #${i}`;
    yield item;
  }
};

const items = itemMaker({ max: 10 });
const list = document.getElementById('list');
const button = document.getElementById('btn');

button.addEventListener('click', () => {
  const newItem = items.next();
  if (!newItem.done) list.appendChild(newItem.value);
});
```

It illustrates how cool generator can be in that case. You can **keep the iteration logic inside** your method, no need to keep track of the current or last index in an external variable. Simple, clear, elegant, plus the useful `done` value to check the progress.

## Conclusion
Generators are maybe not the most used JavaScript expression, but still, there are cases where they can be very handy. See it as a special type of iterator. Now, it's your call to choose if you prefer generators over the very appealing `async/await` syntax :innocent:

---

*Supported with* 💛 *by [Antistatique](https://antistatique.net)*