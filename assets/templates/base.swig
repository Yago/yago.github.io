<!doctype html>
<html>
<head>
  <title>{{ title }}</title>
</head>
<body>
  <h1>Homepage</h1>
  <pre>{{collections|raw}}</pre>
  <ul>
    {% for post in collections.posts %}
      <li><a href="{{post.path}}">{{post.title}}</a></li>
    {% endfor %}
  </ul>
</body>
</html>
