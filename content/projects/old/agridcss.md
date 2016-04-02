---
title: Agrid.css
Description: Agrid est un système de grille fluide et hyper facile d'utilisation. Il suffit de baliser l'html de quelques classes pour créer une mise en page. Agrid permet aussi de réaliser une grille personnalisable dans ses moindres paramètres.
author: Yann Gouffon
date: 2013-05-22 14:54:43
collection: projects
tags: projet
---

Agrid est un système de grille fluide. Il est <strong>léger, facile à utiliser et extrêmement flexible</strong>. Tout comme un Twitter Bootstrap, il suffit de définir une structure html de base agrémentée de classe définissant les proportions de vos blocs.

```html
<div class="container">
    <div class="row">
        <div class="span4"></div>
        <div class="span4"></div>
        <div class="span4 last"></div>
    </div>
</div>
```

À partir de cette structure simple et logique, tout est possible !

Pour ceux qui souhaiteraient aller plus loin, <strong>agrid.less</strong> permet de générer une grille personnalisée en choisissant quelques paramètres. Il est possible de choisir le nombre de colonnes, la taille des gouttières proportionnelle à celles des colonnes et la largeur maximum du conteneur. Avec ces quelques paramètres, la grille s'adaptera parfaitement à tous les besoins.

```less
// CONTROL PANEL
//=========================================

// Define the number of columns
@columnNumber : 12;

// You want Gutter ? (yes=1/no=0)
@gutterExist : 1;

// Define the smallest .span
@startFrom : 1;

// Define the ratio between column and gutter
@columnRatio : 1.61803399;

// Define the max-width of your Grid
@maxWidth : 1140px;

// Define the Media Queries steps
@limit : 767px;
@ieLimit : 950px;
```

N'hésitez pas à faire un tour sur la page de [présentation](http://yago31.github.io/agrid.css/) et à forker le projet [Github](https://github.com/yago31/agrid.css)

