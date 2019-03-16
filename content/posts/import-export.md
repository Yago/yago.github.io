---
path: /blog/import-export
title: "Import/Export Business"
date: 2019-02-25
type: post
---

**Do you like to organize your JavaScript projects in multiple and ingeniously split code files, me too!** Lucky you (and me), thanks to Webpack or any tool of this kind, it's getting simpler and simpler, especially with the export / import statements. But when and how do I use them?

## Support
With the  ECMAScript 2015 blessing, came the `import` and `export` statements, also known as JavaScript modules or **ES modules**. Very flexible and easy to use, It's sadly not yet supported on every browser (no shit Sherlock), but **also not entirely on NodeJS**.

Node was using **CommonJS** for a long time, but they are working on a Modules Implementation to stay close to the browser implementation. For the moment, it's more stable and safe to use `module.exports` and `require()` on your Node applications, but if you want to follow the progress of the Module Team, I invite you to read the very clear [blog post of  Dr. Axel Rauschmayer](http://2ality.com/2018/12/nodejs-esm-phases.html) or to check the official [Github repository](https://github.com/nodejs/modules).

## Basics
The most basic form is when you want to export by default a variable that you've created and use it in another file.

```js
// ./addition.js
const addition = (a, b) => a + b;
export default addition;

// ./my-script.js
import addition from './addition.js';
addition(3, 2); // return 5
```

You can also directly export without the need of creating a variable.

```js
// ./addition.js
export default (a, b) => a + b;

// ./my-script.js
import addition from './addition.js';
addition(3, 2); // return 5
```

Now, you oftently need to export and import more than one variable, for that you can do something like this :

```js
// ./math.js
export const addition = (a, b) => a + b;
export const subtraction = (a, b) => a - b;

// ./my-script.js
import { addition, subtraction }  from './math.js';
addition(3, 2); // returns 5
subtraction(3, 2); // return 1
```

As you can see, no more default export and now, you can import whatever method you want to use elsewhere.

## More advanced
You can also combine targeted  variables and default export when importing.

```js
// ./math.js
const addition = (a, b) => a + b;
export default { addition };

// ./my-script.js
import math, { addition }  from './math.js';
addition(3, 2); // targeted export, returns 5
math.addition(3, 2); // default export, returns 5
```

When names are not well suited for some cases, you can rename it during export and/or import!

```js
// ./math.js
const addition = (a, b) => a + b;
export { addition as sum };

// ./my-script.js
import { sum as foo }  from './test.js';
foo(3, 2); // return 5
```

If there is multiple export, but you want to attach them all to a single item, you can import `*`

```js
// ./math.js
export const addition = (a, b) => a + b;
export const subtraction = (a, b) => a - b;

// ./my-script.js
import * as math from './math.js';
math.addition(3, 2); // returns 5
math.subtraction(3, 2); // return 1
```

## Expert mode
When your multiple export module start to (re-)create some kind of monolithic file, it's time to use an **export proxy**.

```js
// ./addition.js
export const addition = (a, b) => a + b;

// ./subtraction.js
export const subtraction = (a, b) => a - b;

// ./math.js
export { addition } from './addition.js';
export { subtraction } from './subtraction';

// ./my-script.js
import { addition, subtraction } from './math.js';
addition(3, 2); // returns 5
subtraction(3, 2); // return 1
```

## Conclusion
As you can see, it's a pretty simple topic, but very useful, especially to keep your projects organized and easy to understand. CommonJS was a good start, but import/export statements are really the apotheosis of JavaScript modules management and God, it's so pleasing to write something like `import React, { useState } from 'react';`  :heart_eyes:

---

*Supported with* 💛 *by [Antistatique](https://antistatique.net)*