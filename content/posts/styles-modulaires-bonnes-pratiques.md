---
path: /blog/styles-modulaires-bonnes-pratiques
title: Styles modulaires - bonnes pratiques
date: 2013-11-25 16:06:30
type: post
description: "La modularité ou OO (object oriented) est un concept depuis longtemps utilisé en programmation. Avec l'apparition des préprocesseurs CSS, le monde du frontend a commencé à s'ouvrir gentiment à cette idée afin de créer des styles plus flexibles et réutilisables. "
---

La modularité ou OO (object oriented) est un concept depuis longtemps utilisé en programmation. Avec l'apparition des préprocesseurs CSS, le monde du frontend a commencé à s'ouvrir gentiment à cette idée afin de créer des styles plus flexibles et réutilisables. Maintenant que le temps de l'expérimentation de ses nouvelles technologies est passé, et avec le recul nécessaire, **voici les bonnes pratiques à observer pour des styles au top**.

Il y a 6 mois, j'ai écris un [article](http://antistatique.net/blog/2013/03/12/less-possibilites-et-utilisation/) sur le blog de l'agence dans lequel je parlais des bonnes pratiques des langages de préprocessing CSS. Maintenant, plus que dans l'utilisation du langage, certains concepts généraux doivent être observés afin d'obtenir des styles modulaires.

## Fragmentation

Plutôt que d'avoir une feuille de styles à 5'000 lignes, **découpez de façon logique votre code**. Peu importe le mode de fragmentation, il faut que ce dernier soit cohérent et qu'il puisse être compris de tous. Dans l'idéal, le fichier principal qui va être exporté en CSS ne doit contenir que des imports bien documentés.

Un peu à la [Twiter Bootstrap](http://getbootstrap.com), séparez et groupez votre code par éléments, portions de layouts ou catégorie. Voici à quoi votre main.scss, ou que sais-je, pourrait ressembler :

```scss
// main.scss example *****************

// Basis
@import 'normalize';
@import 'grid-system';
@import 'mixins';
@import 'variables';

// Elements
@import 'text';
@import 'layout';
@import 'form';
@import 'table';
@import 'list';
@import 'button';

// Layout area
@import 'header';
@import 'navigation';
@import 'list-item';
@import 'profile';
@import 'article';
@import 'footer';
```


## Variables et mixins

L'utilisation des variables est indispensable à moins que vous ne soyez plutôt partisan du "chercher / remplacer" à outrance. Dans le cas contraire, créer un fichier indépendant pour les variables et un autre pour les mixins semble être une déduction logique du principe énoncé plus haut.

Comme pour les fichiers, **vos variables doivent être regroupées selon une certaine logique**. Dans l'idée, créez une rubrique par couleurs, fonts et cotes. Vous pouvez le faire différemment, mais ce dernier a le mérite d'être à la portée de tous. Et comme toujours, documenter votre code, car les variables seront le nerf de vos styles.

Pour ce qui est des mixins, comme avant, regroupez-les et documentez-les pour pouvoir vous y retrouver quand elles commenceront à se multiplier. **Gardez a l'esprit que chaque fois que vous devrez dupliquer une portion de code pour en changer les valeurs, créez une mixin**. Comme en programmation, la mixin est une machine plus ou moins complexe qui vous permettra, en fonction des paramètres que vous lui passerez, d'aboutir au résultat désiré sans dupliquer le moindre code.

## Les styleguides

L'emploi d'un système de styleguide vous obligera à penser et coder modulaire. En effet, si vous commencer par concevoir les éléments de votre design indépendamment les uns des autres en ne les consultants que dans votre styleguide, vous aurez intégré le plus gros du concept. En effet, avant de toucher la moindre portion d'HTML, **créer vos éléments dans votre styleguide** et une fois le catalogue plus ou moins complet, mettez-le à l'épreuve en condition réelle. Il y aura toujours des ajustements, mais le constat serra sans équivoque : créer une nouvelle page vous semblera aussi aisé qu'utiliser un framework CSS.

Dans les technologies mises à disposition, vous avez le célèbre [KSS](http://warpspire.com/kss/) utilisé notamment pour Github, mais aussi [Kalei Styleguide](http://kaleistyleguide.com) plus simple à mettre en place et qui utilise une syntaxe Markdown très pratique. Il existe aussi [StyleDocco](http://jacobrask.github.io/styledocco/) qui reprend le même principe que Kalei. Bref, au final plusieurs options s'offrent à vous et **il vous reste à employer celui avec lequel vous serez le plus à l'aise**.

## Un nouveau monde s'offre à vous!

Fini le casse-tête des mises à jour, finis le calvaire des ajustements dans le design, finis les définitions de style trop contraignantes, **vous voici aux portes du merveilleux monde du développement modulaire !**



