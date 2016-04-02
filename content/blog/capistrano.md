---
title: Capistrano
author: Yann Gouffon
date: 2013-05-28 05:34:59
collection: posts
tags: framework
description: "Il existe plusieurs frameworks de déploiement et Capistrano est surement l'un des plus connus. Avec un simple \"cap deploy\", vos dernières mises à jour seront automatiquement envoyées via SSH sur votre serveur de production. Il nécessite cependant une petite installation, mais rien en comparaison du temps que vous allez gagner."
---

Avant, pour mettre mon site en ligne, je devais envoyer mes fichiers via FTP, régler la config en ligne, faire un Dump de ma base de données et la réimporter dans la DB distante, mais ça, c'était avant.

Il existe plusieurs frameworks de déploiement et [Capistrano](https://github.com/capistrano/capistrano) est surement l'un des plus connus. Avec un simple "cap deploy", vos dernières mises à jour seront automatiquement envoyées via SSH sur votre serveur de production. Il nécessite cependant une petite installation, mais rien en comparaison du temps que vous allez gagner.

##Quelques prérequis

Pour utiliser Capistrano, il vous faut :

* Un accès SSH à votre serveur avec votre clef publique
* Une version de Ruby supérieur à 1.3.0
```shell
$ gem -v
```
* L'utilisation de [Git](http://git-scm.com/) dans votre projet (pas obligatoire, mais vivement recommandé)

##Installation

Pour installer Capistrano et ses extensions :
```shell
$ gem install capistrano
$ gem install capistrano-ext
$ gem install railsless-deploy
```

Ensuite, allez dans votre répertoire et lancez Capistrano :
```shell
$ cd path/to/your/directory/
$ capify .
```

##Comment ça fonctionne en fait ?

Capistrano ne va pas simplement envoyer vos fichiers sur votre serveur, il va également créer une arborescence destinée à versionner votre site. De ce fait et en cas de problème, Capistrano vous permettra de retourner à la version précédente en une fraction de seconde.

En soit, la structure est relativement simple. À la racine de votre répertoire, il va créer un répertoire **shared** pour tous les fichiers partagés, un répertoire **releases** pour toutes les versions de votre site et un lien symbolique **current** qui pointera vers la dernière release.

```shell
monSite
├── current -> /home/monSite/releases/20130527070530
├── releases
│   ├── 20130527065508
│   ├── 20130527065907
│   └── 20130527070530
└── shared
```

##Le script de déploiement

Capistrano n'est qu'un exécuteur. Afin de le faire fonctionner, il faut lui donner une recette. En exécutant la commande "capify .", Capistrano vous a créé un fichier **Capifile** et un répertoire **config** avec **deploy.rb** à l'intérieur. C'est ce dernier qui va donner la recette de votre déploiement à Capistrano.

Dans ce fichier, vous pouvez absolument tout faire en définissant des paramètres et en exécutant des lignes de commandes dans un ordre défini.

##Ma méthode

Le script que je vais vous présenter est utilisable pour la plupart des CMS PHP, du type Wordpress, utilisant une base de données. Avec quelques ajustements, il peut très bien être utilisé pour un site statique ou que sais-je encore. Donc tout d'abord dans **Capfile** :

```ruby
require 'rubygems'
require 'railsless-deploy'
load 'config/deploy.rb' if respond_to?(:namespace)
```

Puis dans **deploy.rb**, on commence par définir nos paramètres serveur :

```ruby
# SERVER (exemple user@user.hostingservice.com)
set :domain,  "user.hostingservice.com"
set :user,    "user"

# NAME
set :application, "monApplication"
```

Ensuite, on va définir les paramètres liés à notre repository Git :

```ruby
# REPOSITORY (exemple avec un repo Bitbucket)
set :repository, "git@bitbucket.org:User/application-name.git"
server "#{domain}", :app, :web, :db, :primary => true
set :deploy_via, :copy
set :copy_exclude, [".git", ".DS_Store"]
set :scm, :git
set :branch, "master"
```

Puis les paramètres liés au déploiement :

```ruby
# DEPLOY PARAMETERS
set :deploy_to, "/home/user/webapps/#{application}"
set :use_sudo, false
set :git_shallow_clone, 1
set :keep_releases, 10
ssh_options[:paranoid] = false
```

Et pour finir, les paramètres liés à la base de données :

```ruby
# DATABASE
set :dump_name, "dump.#{Time.now.strftime '%Y%m%d%H%M%S'}.sql"
set :dbuser, "remote_user" 
set :dbhost, "server.hostingservice.com"
set :dbpassword, "PASSWORD"
set :application_db, "remote_db_name"
set :local_db_host, "localhost"
set :local_db_user, "root"
set :local_db_password, ""
set :local_db, "local_db_name"
```

Ensuite, on va créer des fonctions de déploiement en commençant par celle qui enverra les fichiers et qui installera votre fichier de config, ici **db.php.dist** qui va remplacer **db.php**.

```ruby
namespace :deploy do
  desc <<-DESC
  A macro-task that updates the code and fixes the symlink.
  DESC
  task :default do
    transaction do
      update_code
      symlink
    end
  end

  task :update_code, :except => { :no_release => true } do
    on_rollback { run "rm -rf #{release_path}; true" }
    strategy.deploy!
  end

  desc "Set config file"
  task :config_file do
    run "rm #{release_path}/cms/config/db.php"
    run "cp #{release_path}/cms/config/db.php.dist #{release_path}/anchor/config/db.php"
    run "rm #{release_path}/cms/config/db.php.dist"
  end
end
```

Nous allons ensuite nous occuper de la fonction qui va migrer votre base de données vers la base de données distante. Cette fonction est très simple : elle va créer un Dump dans le répertoire **dump/** (qu'il faudra préalablement créer) avec la date extacte afin d'avoir un fichier unique, puis va l'envoyer via SSH sur le MYSQL de votre serveur. J'ai pris le parti de ne pas supprimer les Dumps afin de garder un versionnement de ma DB, mais libre à vous de les supprimer. Dans tous les cas, je vous conseille de ne pas les commiter sur votre repo Git.

```ruby
namespace :db do
  desc "Clone local DB to remote"
  task :migrate do
    system "mysqldump -u #{local_db_user} -B #{local_db} > dump/#{dump_name}"
    system "ssh -C #{user}@#{domain} mysql -u #{dbuser} --password=#{dbpassword} #{application_db} < dump/#{dump_name}"
  end
end
```

Pour en finir avec **deploy.rb**, il faut encore définir quelles fonctions vont être executé, et dans quel ordre.

```ruby
#En premier nous allons migrer la base de données
before "deploy:update_code", "db:migrate"

#Puis après l'envoi des fichiers, installer le fichier de config
after "deploy:update_code", "deploy:config_file"

#Pour finir, supprimer les veilles releases selon -> set :keep_releases
after "deploy:update_code", "deploy:cleanup"
```

##Enfin le déploiement !

Maintenant que la recette est écrite, il ne reste plus qu'à déployer. Au premier déploiement et pour créer les différents répertoires:
```shell
$ cap deploy:setup
```

Ensuite la commande magique pour chaque mise à jour :
```shell
$ cap deploy:setup
```

Et selon ma recette, si vous souhaitez seulement migrer la base de données:
```shell
$ cap db:migrate
```

Un problème ?
```shell
$ cap deploy:rollback
```

##Hum... le site ne marche pas !

Et c'est normal, car comme je vous l'ai expliqué plus haut, il vous faut encore paramétrer le serveur pour qu'il pointe sur **current** afin d'exécuter la bonne release. Donc pour cela, créez un **.htaccess** à la racine:
```shell
<IfModule mod_rewrite.c>
    RewriteEngine on
    RewriteCond %{REQUEST_URI} !^/current
    RewriteRule ^(.*)$ /current/$1 [L]
</IfModule>
```

##Conclusion

Capistrano est **LA** solution qui simplifiera votre vie et dont vous ne pourrez plus vous passer. Malgré les prérequis nécessaires, c'est un outil qui se prend vite en main et qui, malgré le temps d'apprentissage, vous fera gagner un temps considérable dans tous vos projets.

N'hésitez pas si vous avez une question et pour ceux qui souhaiterais en savoir plus:<br />
[Le Wiki officiel](https://github.com/capistrano/capistrano/wiki)<br />
[Pour Symfony2](http://capifony.org/)<br />
[Un excellent article](http://ryanflorence.com/deploying-with-capistrano-without-rails/)
