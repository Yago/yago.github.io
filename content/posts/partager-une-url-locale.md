---
path: /blog/partager-une-url-locale
title: Partager une URL locale
date: 2013-06-03 05:40:46
type: post
description: "En cours de mandat, il vous est surement déjà arrivé de vouloir montrer votre travail à un collègue ou à votre client, mais sans pour autant effectuer tout un déploiement. Il existe, en effet, des moyens tout simple pour partager votre site local vers un réseau local ou externe."
---

En cours de mandat, il vous est surement déjà arrivé de vouloir montrer votre travail à un collègue ou à votre client, mais sans pour autant effectuer tout un déploiement. Vous pourriez en effet utiliser [Capistrano](http://www.yago.io/blog/capistrano) afin d'éviter toute hésitation de déploiement. Cependant, il existe des moyens tout simple pour partager votre site local vers un réseau local ou externe.

Si vous souhaitez partagez un site installé sur votre apache local, il suffit de lui attribuer un port et de donner votre IP suivi du port pour que quiconque sur votre réseau local puisse y accéder. Pour ce faire, allez définir le port dans votre fichier **http-vhosts.conf** :

```apacheconf
Listen 8001
<VirtualHost *:8001>
    ServerName monSite.dev
    DocumentRoot "/Users/Me/Sites/monSite"
    DirectoryIndex index.php
</VirtualHost>
```

Puis il suffit de donner votre IP suivi du port défini ci-dessus. Par exemple :
```bash
192.168.0.1:8001
```

Pour ceux qui souhaiterais partager leur apache local vers un réseau externe, un super outil gratuit existe : [Localtunnel](http://progrium.com/localtunnel/). Il vous suffit de l'installer, puis de lui faire écouter un port et il se chargera de vous fournir une URL que vous pourrez partager. En pratique, il va créer un tunnel SSH entre votre machine et lui pour que tout un chacun puisse accéder à votre port.

Donc pour installer Localtunnel et lui transmettre votre clef SSH public :
```bash
$ sudo gem install localtunnel
$ localtunnel -k ~/.ssh/id_rsa.pub 8080
```

Puis autant fois que vous le désirez :
```bash
$ localtunnel 8001
```

Localtunnel va vous donner quelque chose dans ce goût-là, vous n'aurez plus qu'à copier l'URL.
```bash
This localtunnel service is brought to you by Twilio.
Port 8001 is now publicly accessible from http://3yag.localtunnel.com ...
```

Voilà, maintenant vous savez tout et vous pouvez enfin partager vos projets les plus fous à tous vos amis !
