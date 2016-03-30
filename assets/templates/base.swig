<!doctype html>
<html>
<head>
  <title>{{ pagination.num }}</title>
</head>
<body>
  <h1>Homepage</h1>
  <ul>
    {% for post in pagination.files %}
      <li><a href="/{{post.path}}">{{post.title}}</a></li>
    {% endfor %}
  </ul>

  {% if pagination.previous.path %}
    <a href="/{{pagination.previous.path}}">Previous</a>
  {% endif %}
  {% if pagination.next.path %}
    <a href="/{{pagination.next.path}}">Next</a>
  {% endif %}
</body>
</html>
