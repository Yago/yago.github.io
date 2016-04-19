{% extends "base.swig" %}

{% block content %}
  <div class="text-center">
    <ol class="breadcrumb">
      <li><a href="/"><i class="icon icon-tipi"></i></a></li>
      <li>
        {% if collection == 'posts' %}
          <a href="/blog/1">blog</a>
        {% elseif collection == 'projects' %}
          <a href="/projects">projects</a>
        {% elseif collection == 'oldies' %}
          <a href="/projects">projects</a></li>
          <li><a href="/oldies">oldies</a>
        {% endif %}
      </li>
      <li class="active">{{title}}</li>
    </ol>
  </div>

  {% if not nocover %}
    <img src="/img/cover/{{path|slug}}.jpg" class="cover">
  {% endif %}

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
