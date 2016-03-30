/*
Title: Google Drive comme CMS !
Description: N'avez-vous jamais rêvé de mettre en place une petite administration pour votre site afin d'y ajouter ou d'y modifier du contenu sans douleur ? Maintenant, avec Google, c'est possible !
Author: Yann Gouffon
Date: 2014-03-11 13:05:25
Tags: tips
*/

N'avez-vous jamais rêvé de mettre en place une petite administration pour votre site afin d'y ajouter ou d'y modifier du contenu sans douleur ? Maintenant, avec Google, c'est possible !

Google, avec son Drive, propose en effet de créer et de stocker dans le cloud des documents de plusieurs types différents; des documents textes, des tableurs, des présentations et même des formulaires. Dans notre cas, nous allons utiliser les formulaires et les tableurs, ou "spreadsheet".

##Le concept

Comme dans une administration classique, nous allons utiliser un formulaire, lié à une spreadsheet où nous irons rechercher les données précédemment entrées. 

>Quelle différence avec une base de donnée ?

Aucune, le système est le même, mais l'avantage de ce système est sa rapidité de mise en place. On pourra donc l'utiliser pour une quantité réduite de données et une structure à une table.

Dans notre exemple, nous allons créer une petite administration afin d'ajouter et d'afficher la liste des membres de notre association (fictive).

##Ajouter des membres

Pour cela, nous allons commencer par créer un nouveau formulaire que nous nommerons "Ajout de membres" avec les champs nom, prénom et E-mail. Ensuite, avec "Choisir une destination pour la réponse", nous allons lui assigner une nouvelle spreadsheet que nous nommerons "Liste des membres".

Maintenant, vous pourriez très bien partager le [lien vers votre formulaire](https://docs.google.com/forms/d/1Le-duty7sC7hRU5vidzYpeMT_Ww7s5mU3c4k4VjXU8k/viewform) ou simplement l'intégrer sur votre site au moyen de l'iframe proposé. Mais dans les deux cas, l'aspect visuel resterra peu convaincant.

Pour intégrer le formulaire directement sur notre site, il nous suffit de visiter le formulaire comme si nous souhaitions le remplir, puis, en affichant le code source de la page, copier simplement tout l'élément formulaire et le coller dans notre code.

Nous devrions donc avoir quelque chose comme ça :

```html
<form action="https://docs.google.com/forms/d/1Le-duty7sC7hRU5vidzYpeMT_Ww7s5mU3c4k4VjXU8k/formResponse" method="POST" id="ss-form" target="_self" onsubmit="">
...
</form>
```

Maintenant, vous constaterez surement qu'après la soumission, nous nous retrouvons avec la même page toute moche de confirmation.

Pour définir une page de confirmation différente, il nous suffit de remplacer le :

```html
<form action="https://docs.google.com/forms/d/1Le-duty7sC7hRU5vidzYpeMT_Ww7s5mU3c4k4VjXU8k/formResponse" method="POST" id="ss-form" target="_self" onsubmit="">...</form>
```

par :

```html
<script type="text/javascript">var submitted=false;</script>
<iframe name="hidden_iframe" id="hidden_iframe" style="display:none;" onload="if(submitted) {window.location='http://mon-site.com/ma-page-de-confirmation.html';}"></iframe>
<form action="https://docs.google.com/forms/d/1Le-duty7sC7hRU5vidzYpeMT_Ww7s5mU3c4k4VjXU8k/formResponse" method="post" target="hidden_iframe" onsubmit="submitted=true;">...</form>
```

Nous voici près à rentrer nos membres ! Maintenant, si nous souhaitions être les seuls à pouvoir accéder à ce formulaire comme dans une administration classique, rien ne nous empêche de le placer dans un répertoire protégé par un .htpasswd.

##Afficher les membres

Avant toute chose, il nous faut nous rendre dans notre spreadsheet de résultats et la rendre consultable avec le lien (option de partage). Puis, dans Fichier/Publier sur le Web, nous allons démarrer la publication. Ce sera cette publication, duplicata de notre spreadsheet, qui sera utilisée pour afficher les données. N'oubliez pas de recopier la clé de votre document.

La suite est assez simple et même les profanes à PHP comprendront ! Nous allons simplement récupérer le JSON sortant de la spreasheet et afficher les éléments ligne par ligne.

Pour récupérer le JSON (en PHP) :

```php
// Clé de la spreadsheet
$key = '0AmViBjefqXQgdG43QVJpcUhDeXU1NGpWSS1DWW9RNkE';

$spreadsheet = sprintf('https://spreadsheets.google.com/feeds/list/%s/1/public/values?alt=json', $key);
$data = json_decode(file_get_contents($spreadsheet), true);
```

Maintenant, il ne reste plus qu'à faire une boucle sur chaque ligne et d'en afficher le contenu. En l'occurrence nous voulons afficher le prénom et le nom de nos membres, ainsi qu'un lien vers son adresse e-mail.

```php
// Pour chaque ligne (entrée) du tableau :
foreach($data['feed']['entry'] as $row) {
  echo $row['gsx$prénom']['$t'].' '.$row['gsx$nom']['$t'].'<br>';
  echo '<a href="mailto:'.$row['gsx$e-mail']['$t'].'">'.$row['gsx$e-mail']['$t'].'</a><br>';
}
```

##Conclusion

On peut bien évidemment aller plus loin dans la complexité, jusqu'à créer un petit moteur de blog sur ce principe. Néanmoins, il reste plus adéquat d'utiliser une "vraie" base de données dans le cas d'un site plus complexe.

L'avantage de ce système réside dans le fait que les données restent accessibles et éditables directement à la source pour le client. Il pourra, en effet, y faire directement ses modifications, mais aussi changer le statut d'une ligne en passant une valeur de TRUE à FALSE par exemple ;)


[Retrouver cet article sur le blog d'Antistatique !](http://antistatique.net/blog/2014/03/11/google-drive-comme-cms/)
