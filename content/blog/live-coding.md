---
title: Live coding
author: Yann Gouffon
date: 2014-09-13
collection: posts
tags: tips
description: "Lors de la création des styles de votre site, combien de fois enregistrez, switchez sur dans votre navigateur préféré (ou pas) et rafraichissez-vous la page ? Une fois la question soulevée, vous vous rendrez bien vite compte du nombre hallucinant de fois que vous le faites machinalement. Si vous en avez ras le bol de subir cette manipulation, la suite va vous plaire !"
---

Lors de la création des styles de votre site, combien de fois **enregistrez**, **switchez** sur dans votre navigateur préféré (ou pas) et **rafraichissez-vous** la page ? Une fois la question soulevée, vous vous rendrez bien vite compte du nombre hallucinant de fois que vous le faites machinalement. Au final, il s'agit d'une quantité non négligeable de précieuses minutes ainsi gaspillées. Si vous en avez ras le bol de subir cette manipulation, **la suite va vous plaire !**

## La solution old school
Pour ceux préférant utiliser un préprocesseur CSS pour élaborer leurs styles, la quête DU compilateur est toujours d'actualité. Je vous conseille fortement d'employer la solution de base via le terminal, **mais pour ceux dont la console provoque une violente éruption cutanée**, il y a** [LiveReload](http://livereload.com/)** !

![LiveReload](http://yago.io/content/images/live-coding-livereload.png)

Servant en premier lieu de compilateur pour tous les langages de préprocessing, il permet également, via une extension dédiée à votre browser favori, de recharger la page à chaque modification d'un des fichiers de votre projet. Vous n'avez plus qu'à coder et à chaque enregistrement, le navigateur situé à côté se recherchera tout seul !

## Pour aller plus loin
**Pour ceux pour qui le terminal ne fait pas peur et qui souhaiteraient aller un peu plus loin**, il y a **[BrowserSync](http://www.browsersync.io/)** ! Basé sur NodeJS, BrowserSync utilise la célèbre librairie [Socket.io](http://socket.io/) afin de synchroniser tous les navigateurs connectés.

> Wait, what ?!?

Eh oui, **BrowserSync génère un proxy pointant vers votre projet** qui, en utilisant l'URL fournie, permet de synchroniser vos browsers, desktops ou mobiles. Vous remarquez, perspicaces lecteurs, que j'utilise le terme "synchroniser" et pas "recharger" comme pour LiveReload. En effet, BrowserSync fait bien plus que recharger vos navigateurs, **il offre une navigation synchronisée durant vos tests**. Cela signifie que lorsque que vous changez de page, tous les navigateurs changent de page et quand vous scrollez, tous les navigateurs scroll en même temps !

## L'utilisation
Premièrement, il vous faut NodeJS et [npm](https://www.npmjs.org/). Ensuite, il vous suffit d'installer le module sur votre système :

```bash
$ npm install -g browser-sync
```
Maintenant, avant de le lancer, il faut comprendre une chose. **Vous devez lui donner les fichiers à observer** sur lesquels il se basera pour lancer le rafraichissement. Il y a également une série d'options magnifiquement décrites dans la [documentation](http://www.browsersync.io/docs/command-line/) du module. En pratique, cela donne quelque chose comme cela :

```bash
$ browser-sync start --server --files "build/css/*.css"
```

Du coup, chaque fois que mon CSS sera compilé, BrowserSync va rafraichir tous les navigateurs connectés.

![Live coding gif demo](http://yago.io/content/images/live-coding2.gif)

## Parfait avec un task runner
Le gros avantage de BrowserSync est sa simplicité d'implémentation dans des task runners tel que [Grunt](http://gruntjs.com/) ou [Gulp](http://gulpjs.com/).** Il peut très facilement être lancé après l'exécution de tâches spécifiques** afin de s'intégrer au mieux dans votre workflow. Sa souplesse en fait donc un outil proche de la perfection !

## Vive le live coding !
J'espère avoir pu encore **contribuer à l'amélioration de votre condition d'intégrateur**. Quoi qu'il en soit, utiliser un des outils présentés ci-dessus va rendre votre travail clairement plus cool et si vous souhaiter voir un morphing de votre design à chaque reload, ajouter simplement ceci en haut de votre feuille de style :

```css
* {transition: all 0.3s;}
```

Après, ça reste juste pour le fun, **évitez donc de l'appliquer en production** ;)
