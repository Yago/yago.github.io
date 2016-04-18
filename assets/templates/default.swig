{% extends "base.swig" %}

{% block content %}
  <img src="/img/cover/{{path|slug}}.jpg" class="cover">
  <div class="article-container">
    <div class="text-center">
      <h1>{{title}}</h1>
      <div class="date">
        {{date|date('d.m.Y')}} &bullet; {{author}}
      </div>
    </div>

    <article>
      {{ contents|raw }}
    </article>
  </div>
{% endblock %}
