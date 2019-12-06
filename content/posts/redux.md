---
path: /blog/redux-re-introduction
title: "Redux (re)introduction"
date: 2019-08-21 
type: post
---

**Redux is one of my favorite JavaScript library outside**. I've been using it for three years and I never stopping love it. Recently, I've made a crash course to my workmates about Redux and some related libraries. So it's a good opportunity to (re)introduce Redux core concepts for those who don't already use it daily.

## The loop
Be reassured, we are not talking about Wordpress Loop here, but about **the base concept of Redux: its loop**. The main goal of the library is to manage a store, your local database, and distribute the data across various contexts of your application.

<gimg alt="gdal hillshade" src="redux-loop.png"></gimg>

So the first (or the last) entity of the loop is the **Store**, basically a big JavaScript object. Then, there is the **consumer** which will be bonded to the store to receive its data. This consumer can also trigger ou third entity, the **actions**. Those simple JavaScript functions will return a object containing at least a `type` . When any actions are fired, our last entity, the **reducers**, will check those types and conditionally mutate the Store.

## Store and sub-stores
The Store is one big JavaScript Object, but to keep things understandable and organized, it's recommended to use the `combineReducers` that will “split” your Store into sub-stores. It's still Objects accessible though the Store, but  in the future you will be able to choose which one to access in your consumer.

## Vanilla example
For this example, no complex React-Redux architecture, only Redux plain JavaScript. The goal is fairly simple, change a `year` value in a `time` sub-store.

First we need to define our **initial state**: the default value of our time sub-store.
```js
const timeInitialState = {
  year: 1972,
};
```

Then, our **action**.
```js
const setYear = year => ({
  type: 'SET_YEAR',
  payload: year,
});
```

Now, our **reducer** to mutate the Store.
```js
const timeReducer = (state = timeInitialState, action) => {
  switch (action.type) {
    case 'SET_YEAR':
      return {
        ...state,
        year: action.payload,
      };

    default:
      return state;
  }
};
```

And finally the **Store** itself with the Redux Devtools for debugging clarity.
```js
const rootReducer = combineReducers({
  time: timeReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
	window.__REDUX_DEVTOOLS_EXTENSION__()
);
```

Here our **consumer** is a piece of vanilla JavaScript that binds DOM elements to our Store.
```js
const title = document.getElementById('year-title');
const field = document.getElementById('year-field');
const button = document.getElementById('set-year');

button.addEventListener('click', () => {
  store.dispatch(setYear(field.value));
});

const render = () => {
  title.innerHTML = store.getState().time.year;
  field.value = store.getState().time.year;
};

render();
store.subscribe(render);
```

We can see that the binding uses `store`'s api:
- `.dispatch` to bind our action
- `.getState` to retrieve data
- `.subscribe` to listen store mutations

**[📦 Play with the CodeSandbox example!](https://codesandbox.io/s/redux-vanilla-qebw7?fontsize=14)**

If you are using [react-redux](https://react-redux.js.org) to bind your Redux Store with your React components props, you will use something like:

```jsx
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const MyComponent = ({ time, setYear }) => /*...*/;

const mapState = ({ time }) => ({ time });
const mapDispatch = dispatch => bindActionCreators({ setYear }, dispatch);

export default connect(mapState, mapDispatch)(MyComponent);
```

## Async
If you try to do anything other than directly returning an Object in your action, you will have an error like:

<gimg alt="gdal hillshade" src="redux-error.png"></gimg>

This error is pretty clear: **Redux requires middleware to deal with async actions**. There are a lot of very popular middleware libraries out there and personally my favorite is [redux-thunk](https://github.com/reduxjs/redux-thunk).

To enable *redux-thunk* (and still keep Redux Devtools), you must refactor your Store definition after installing `redux-thunk` and `redux-devtools-extension`.
```js
import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
```

Now you can create asynchronous actions!

Here is a very simple example:
```js
const timeAction = year => dispatch => {
  timeApi(year).then(res =>
    dispatch({
      type: 'SET_YEAR',
      payload: res.year,
    })
  );
};
```

As you can see, your action doesn't return an object anymore, but a function. This function takes `dispatch` as first parameters; the method to return your object or trigger another action when your asynchronous logic is over.

Here is a more complex example using [axios](https://github.com/axios/axios) with loading and error handling:
```js
import axios from 'axios';

export const getPlanets = () => dispatch => {
  const url = 'https://swapi.co/api/planets/?format=json';

  const interceptor = axios.interceptors.request.use(config => {
    if (config.url === url) dispatch({ type: 'FETCH_LOADING' });
    return config;
  });

  axios
    .get(url)
    .then(res => {
      axios.interceptors.request.eject(interceptor);
      dispatch({ type: 'FETCH_SUCCESS', payload: res.data.results });
    })
    .catch(err => dispatch({ type: 'FETCH_ERROR' }));
};
```

**[📦 Play with the CodeSandbox example!](https://codesandbox.io/s/redux-thunk-pwgnl?fontsize=14)**

## About others libs
There are two kinds of Redux users: **those who loves Redux for what it is and those who loves Redux, but not its “boilerplate code”**. The second group use libraries like [redux-actions](https://github.com/redux-utilities/redux-actions) to reduce the amount of code required by a Redux infrastructure. It seems to be a good idea, but in the end, trust me, it will make your code harder to understand because of this useless layer of abstraction.

There is also more “complex” middleware libraries available like [https://redux-saga.js.org](https://redux-saga.js.org) or [redux-observable](https://redux-observable.js.org/). They are great libraries, but they will add another big layer of complexity to your app. So be sure to really need it instead of  [redux-thunk](https://github.com/reduxjs/redux-thunk) before using it.

My final advice: “**never fight Redux boilerplate code, embrace it**”. And just take a look to similar store management using MobX or Apollo with local mutations, there is not that less code 😅.

## Conclusion
Three years later and a lot of concurrent libraries, **Redux is still not dead**! It's still a great state management libraries, regardless of the UI library or framework that you're using. It's great strength is the clarity of its (boilerplate) code and it's amazing debugger.

---

*Supported with* 💛 *by [Antistatique](https://antistatique.net)*
