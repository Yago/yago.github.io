{% extends "base.swig" %}

{% block content %}
  <div class="article-container">
    {{ contents|raw }}
  </div>

  <div class="container">
    <div class="spacer"></div>
    <div class="row">
      <div class="col-sm-8 col-sm-offset-2">
        <h2 class="text-center">Projects</h2>
        <div class="spacer spacer-sm"></div>
        <div class="row row-flex">
          {% for project in collections.projects %}
            {% include '../components/molecules/project-item.swig' with project %}
          {% endfor %}
          <a href="/projects" class="project-item col-sm-4">
            <h4><i class="icon icon-origami"></i> Old Projects.</h4>
            <div class="project-thumb"></div>
          </a>
        </div>
        <div class="spacer spacer-md"></div>
        {% include '../components/atoms/separator.swig' %}
        {% include '../components/organisms/facts.swig' %}
        <div class="spacer"></div>
        {% include '../components/atoms/separator.swig' %}
        <h2 class="text-center">Last blog posts</h2>
        <div class="row ">
          <div class="col-sm-10 col-sm-offset-1">
            {% for post in posts %}
              {% if loop.index < 6 %}
                {% include '../components/molecules/post-item.swig' with post %}
              {% endif %}
            {% endfor %}
            <a href="/blog" class="post-item">
              <h4><i class="icon icon-chukchi"></i> More posts</h4>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="spacer spacer-xl"></div>
{% endblock %}
