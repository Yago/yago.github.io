/*
Title: PSDLENS
Description: PSDLENS est une App en ligne de commande permettant de retourner plusieurs types d'informations concernant les fichiers Photoshop scannés.
  Author: Yann Gouffon
  Date: 2013-08-29 07:15:56
  Tags: projet

*/

![PSDLens animation](http://staging.yago.io/content/images/micro-white.gif)

Après avoir découvert l'incroyable librairie Ruby [PSD.rb](http://cosmos.layervault.com/psdrb.html), j'ai décidé de mettre en place un outil tirant partit du meilleur de cette technologie. Mon envie était de créer une App en ligne de commande permettant de retourner plusieurs types d'informations concernant les fichiers Photoshop scannés.

###Installation

Pour faire tourner [PSDLENS](https://github.com/Yago31/psdlens), il vous faut bien sûr [PSD.rb](http://cosmos.layervault.com/psdrb.html) installé :

```bash
$ gem install psd
$ gem install psdlens
```

###Utilisation

Il suffit de définir le dossier contenant les PSD ainsi qu'une méthode.

```bash
$ psdlens [path] [method]
```

###Le dossier

Le path peut être défini en absolut où par la position actuelle en utilisant le point.

```bash
$ psdlens /path/to/your/dir/ meta
# ou
$ psdlens . meta
```

###Les méthodes

* meta : Retourne les informations principales telles que la taille, le mode colorimétrique et les fonts utilisées
* text : Retourne tous les contenus texte en spécifiant la typo utilisée, la taille et la couleur.
* font : Retourne toutes les fonts utilisées
* content : Retourne uniquement les contenus texte bruts.
* report : Crée un rapport JSON complet pour chaque fichier PSD
