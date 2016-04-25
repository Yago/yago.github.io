---
title: jQuery au taquet !
author: Yann Gouffon
date: 2016-04-24 12:56:00
collection: posts
tags: framework
description: ""
nocover: true
---

jQuery fêtera ses 10 ans le 29 août prochain. Malgré sa perte progressive de sex appeal, peu d'autres librairies peuvent se targuer d'une aussi belle longévité.

**Mon premier contact avec JavaScript s'est fait à travers jQuery**. Je ne peux pas dire que je suis un développeur de la vieille école, car ma formation était plus artistique que technique. Quoi qu'il en soit, afin de mettre un peu d'interactivité dans mon design, c'est avec jQuery que je m'y prenais. **La librairie offre de façon extrêmement aisée tout ce qui touche aux interactions avec le DOM**. Que ce soit la manipulation d'éléments, la gestion des événements ou encore l'animation, jQuery est depuis longtemps reconnu comme la surcouche JavaScript quasis indispensable à tous sites web.

## En perte de popularité

Les choses évoluent et face à des Angular et autres React, jQuery a de plus en plus de peine à séduire. Son utilisation reste extrêmement répandue, mais **l'engouement de la communauté des développeurs tend à décliner**. Il est vrai que depuis mon histoire d'amour récente avec AngularJS, j'ai tendance à voir jQuery comme une librairie qui a fait son temps et qui devrait gentiment songer à la retraite. Il est bien évidemment simpliste de comparer ces “nouveaux” joueurs qui sont plus orientés applicatifs, mais bêtement la confrontation existe bel et bien...

## Ne pas succomber aux trends

En tant que développeur frontend, j'ai une soif insatiable de nouveauté. Un outil que j'utilise depuis un an, soit une éternité en temps web, tend à rapidement me lasser. Donc quoi de plus logique que de reléguer jQuery au placard et d'utiliser Angular ou React dans tous nos sites. Cependant avec l'expérience et le recul, j'ai appris à modérer cette ardeur et à **sélectionner de façon rationnelle les outils les plus adaptés** à une réalisation.

## Un cas concret

Dernièrement, nous avons réalisé un petit site promotionnel pour un client. Trois pages, un design atypique et un budget plus que suffisant pour y passer du temps. Avec l'arrivée fracassante d'ES6 l'année dernière, nous avons pris la décision de **n'utiliser que de l'ES6 vanilla** et grâce à Gulp et Babel, nous avons rapidement mis en place un environnement . Quand est arrivé le temps de tester notre site sur le panel encore utilisé des IEs et sur d'anciens terminaux mobiles, pratiquement rien ne fonctionnait.

Pas que nous ayons utilisé des technologies hyper expérimentales, mais rien qu'une méthode comme `classList` nous a donné des sueurs. En effet, celle-ci n'est pratiquement pas supportée par l'ensemble des IEs et ne comptez pas sur les polyfills, ceux-ci offrent un support très relatif. Même si notre regard s'oriente vers le futur, **nos clients ont rarement le même environnement de pointe**. Il est donc impératif de pouvoir offrir une rétrocompatibilité satisfaisante, chose que la manipulation de DOM en pure ES6 ne fournit pas.

## Des plugins en masse

Heureusement, dans cette histoire il y a encore des développeurs qui portent un intérêt inchangé pour jQuery et qui apporte leur contribution. La période 2015-2016 a vu fleurir nombre de plugins dignes d'intérêt comme [smoothState](https://github.com/miguel-perez/smoothState.js). Rappelons au passage que les composants JavaScript de **Bootstrap 4 et de Foundation 6 se basent toujours sur jQuery**.

## En conclusion

Bien que la suprématie des frameworks applicatifs comme React, Angular ou encore Ember ne sont plus à remettre en question dans le domaine des applications clientes, jQuery a encore de beaux jours devant lui dans l'interactivité web classique. **Rien ne sert de se casser la tête à faire du JavaScript vanilla pour la hype**, alors que jQuery offre une aisance et une compatibilité très supérieures. Comme pour tout, il faut savoir utiliser les outils appropriés à chaque projet et jQuery n'est pas à exclure. N'ayez plus “honte” de l'utiliser et célébrons tous ensemble sa première décennie :kissing_smiling_eyes::tada:
