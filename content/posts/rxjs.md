---
path: /blog/rxjs
title: RxJS
date: 2017-05-02
type: post
description: ""
nocover: true
---

**Le monde de JavaScript est palpitant**. Ces dernières années ont été riches en nouveautés; refonte du langage et pléthore de nouvelles librairies et frameworks. Parmi tout ça, un paradigme de programmation a, lui aussi, gagné en popularité parmi les adeptes de l’ECMAScript : **le reactive programming**.

> Reactive programming is an asynchronous programming paradigm oriented around data streams and the propagation of change.
> — Wikipedia

En soit, ce paradigme ne date pas d’hier, mais c’est sa popularité à grande échelle dans l’écosystème JavaScript qui est relativement récente, **notamment grâce à RxJS**, port JS de [ReactiveX](http://reactivex.io/). Largement utilisée à partir de la version 2 d’Angular, la librairie a progressivement gagné le coeur de toute une communauté, moi y compris.

## Tout est observable
Le coeur de RxJS est l’`Observable`. Entité à laquelle **on peut s’inscrire** pour en recevoir les données, il peut être créé à partir d’une multitude de sources. La plus évidente est l’`Array` permettant à l’`Observable` d’en distiller les valeurs, mais également à partir d’un intervalle temporel, d’une promesse, d’une fusion de deux autres `Observable` ou même de rien.

```javascript
const listStream = Rx.Observable.from([1, 2, 3]);
const timeStream = Rx.Observable.interval(1000); /* 1000ms */
const promiseStream = Rx.Observable.fromPromise(fetch('ip.jsontest.com'));
const mergedStreams = Rx.Observable.merge(listStream, timeStream);
const emptyStream = Rx.Observable.empty();
```

Une fois créé, on va pouvoir s’inscrire à l’`Observable` et ainsi pouvoir lancer des méthodes chaque fois qu’il émet une nouvelle valeur (`onNext`), une erreur (`onError`) ou qu’il a terminé sont travail (`onComplete`). Selon nos besoins, il est possible de s’inscrire plusieurs fois et à différents endroits de notre code à un même `Observable`.

```javascript
const stream = Rx.Observable.from([1, 2, 3]);

stream.subscribe(
  (x) => { console.log(x); },
  (err) => { console.error(err); },
  () => { console.log('Done 👍'); }
);
```
>*live demo sur [JS Bin](https://jsbin.com/kamolem/2/edit?js,console)*

## Opérateur. Fais-moi sortir.
Très proches de l’API de l’`Array`, **les opérateurs sont les méthodes qui vont travailler sur les valeurs émises** par l’`Observable`. Présents dans son `prototype`, ils vont ainsi permettre de modifier ces valeurs, de les concaténer, de les fitrer, etc. Ils peuvent être également combinés afin de permettre des opérations complexes.

```javascript
const stream = Rx.Observable.from([2, 4, 6, 8, 10, 12]);

stream
  .map(x => x * 2)
  .filter(x => x % 3 === 0)
  .skip(1)
  .subscribe(
    (x) => { console.log(x); },
    (err) => { console.error(err); },
    () => { console.log('Cypher ?'); }
  );
```
>*live demo sur [JS Bin](https://jsbin.com/kamolem/3/edit?js,console)*

## Subject, the perfect trigger
Il existe différentes variantes de l’`Observable` selon les langages, dont une particulièrement utile; le `Subject`. Il ne va émettre aucune valeur en particulier, mais va permettre de *trigger* une action partout où le `Subject` est accessible, grâce à la méthode `.next()`. Par exemple, **il pourra faire office de parfait proxy** dans le cas d’un service Angular.

```javascript
const trigger = new Rx.Subject();
const action = trigger.subscribe(() => {
  console.log('Fire 🚀 !')
});

// Somewhere else
trigger.next();
```
>*live demo sur [JS Bin](https://jsbin.com/remeyis/2/edit?js,console)*

## Conclusion
Une fois le paradigme intégré, la librairie est très facile d’utilisation et rapidement prise en main. La [documentation de l’`Observable`](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md), indispensable outil du reactive-js-dev, vous aidera tout au long de votre initiation. J’espère avoir pu contribuer à élargir votre horizon et vous offrir les clés du développement réactif !

Happy coding :kissing_heart:
