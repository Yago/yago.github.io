---
title: Beautiful DEM
author: Yann Gouffon
date: 2013-06-24 17:22:29
collection: posts
tags: gis
description: "Après avoir écrit un article sur la cartographie web, j'ai voulu pousser plus loin la création de cartes. Du coup, je me suis mis à TileMill et les portes du vaste monde du SIG open source se sont ouvertes devant moi. La cartographie web reste un domaine très technique et relativement peu accessible, mais une fois les premières clefs obtenues, le reste vient de soi."
---

Après avoir écrit un [article](http://antistatique.net/blog/2013/04/05/devenez-un-maitre-cartographe/) sur la cartographie web, j'ai voulu pousser plus loin la création de cartes. Du coup, je me suis mis à [TileMill](http://www.mapbox.com/tilemill/) et les portes du vaste monde du SIG open source se sont ouvertes devant moi. La cartographie web reste un domaine très technique et relativement peu accessible, mais une fois les premières clefs obtenues, le reste vient de soi.

Après avoir vu une petite [démonstration](http://www.mapbox.com/blog/tilemill-raster-colorizer/) d'un développeur de chez MapBox, j'ai cherché à reproduire l'exemple sans utiliser la version de développement de TileMill et en appliquant l'expérimentation à notre belle Suisse.

## Trouver les données

Le plus compliqué dans cet exercice a été de trouver des données DEM (digital elevation model) open source et avec une résolution suffisante à un niveau de zoom correct. Il se trouve que les USA sont très en avance en la matière, mais l'Europe... Bref, j'ai fini par trouver [un site](http://www.viewfinderpanoramas.org/dem3.html) très bien qui en partage un certain nombre avec des qualités variant de 1'' à 15''.

## Traiter les données

Ce que vous allez télécharger en fichier .dem ou .hgt sont des données brutes qu'il faudra transformer en images utilisables dans TileMill ou Mapnik. Pour cela, il existe une librairie libre permettant de traiter les images géographiques : [Gdal](http://www.gdal.org/index.html). Pour les utilisateurs de Mac, rendez-vous sur [kyngchaos.com](http://www.kyngchaos.com/software:frameworks) pour obtenir un framework prêt à l'emploi de la librairie et de ses dépendances.

Après avoir installé la librairie, veillez à ne pas oublier de configurer le chemin dans le fichier de configuration de votre terminal :
```bash
export PATH=/Library/Frameworks/GDAL.framework/Programs:$PATH
```

Une fois installé, il va vous falloir merger tous vos fichiers afin de garder un seul fichier DEM. Pour cela, exécutez gdal-merge en spécifiant le nom du fichier combiné, suivi de tous les fichiers que vous souhaitez fusionner.
```bash
$ gdal_merge.py -init "255" -o combined.dem file01.dem file02.dem file03.dem
```

## Obtenir des GeoTIFF

Gdal, entre autres choses, permet de créer des GeoTIFF utilisables dans TileMill ou Mapnik à partir d'un fichier DEM. Pour cet exemple nous aurons besoin de 3 images différentes.

### Hillshade
L'image Hillshade permet d'appréhender au mieux un relief. Grâce à ce modèle numérique de terrain répondant aux conventions d'illumination, l'appréhension du relief de votre carte sera optimal. Pour cela :
```bash
$ gdaldem hillshade -s 111120 combined.dem hillshade.tif
```

![gdal hillshade](/img/images/alps-hillshade.jpg)

### Color-relief
Le color-relief vous permettra d'ajouter des couleurs à votre carte, déterminées par l'altitude. Pour cela, commencez par créer un fichier **color.txt** dans lequel vous donnerez des couleurs rgb en fonction de l'altitude (ici 0m, 500m, 1000m, 2500m et 4000m).

```
0 71 68 62
500 119 101 74 
1000 85 107 50 
2500 187 187 120 
4000 217 222 170 
```

Et dans le terminal :
```bash
$ gdaldem color-relief combined.dem color.txt color.tif
```

![gdal color-relief](/img/images/alps-color.jpg)

### Slope
Le slope est une image qui va mettre en valeur le relief d'une façon différente de l'image hillshade, mais qui va apporter une grosse plus value à votre carte finale. Comme pour color-relief, créez un fichier **color_slope.txt**, indiquant cette fois la coloration en fonction de la pente (entre 0 et 90°).
```bash
0 255 255 255
90 0 0 0
```

Et dans votre console :
```bash
$ gdaldem slope combined.dem preslope.tif -s 111120
$ gdaldem color-relief preslope.tif color_slope.txt slope.tif
```

![gdal slope](/img/images/alps-slope.jpg)

## Finalisation

Ouvrez TileMill et ajoutez vos 3 nouveaux calques en choisissant le bon système de projection (probablement WGS84). Encore un petit peu de CartoCSS et votre carte sera prête ! Dans l'ordre d'empilement :
```css
.slope {
  raster-opacity:0.4;
  raster-scaling:lanczos;
  raster-comp-op: grain-extract;
}
.hillshade {
  raster-opacity:1;
  raster-scaling:lanczos;
  raster-comp-op: soft-light;
}
.color {
  raster-opacity:1;
  raster-scaling:lanczos;
}
```

**Le résultat** : [geolab.io/swissdem.html](http://geolab.io/swissdem.html)

## Conclusion

À partir de cette petite démo, on saisit rapidement l'étendue des possibilités offertes, pouvant ainsi créer toutes sortes de fonds pour nos cartes web. Vous voici entré dans la cour des grands !
