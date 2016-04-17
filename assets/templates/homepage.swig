{% extends "base.swig" %}

{% block content %}
  {% include '../components/molecules/hero.swig' with contents %}

  <div class="container">
    <div class="spacer spacer-sm"></div>
    <div class="row">
      <div class="col-sm-8 col-sm-offset-2">
        <h2>Projects</h2>
        <div class="spacer spacer-sm"></div>
        <div class="row row-flex">
          {% for project in collections.projects %}
            {% include '../components/molecules/project-item.swig' with project %}
          {% endfor %}
          <a href="/projects" class="project-item col-sm-4">
            <h4><i class="icon icon-origami"></i> All Projects.</h4>
            <div class="project-thumb"></div>
          </a>
        </div>

        <div class="spacer spacer-md"></div>
        {% include '../components/atoms/separator.swig' %}

        <h2>Dev facts</h2>
        {% include '../components/organisms/facts.swig' %}

        <div class="spacer"></div>
        {% include '../components/atoms/separator.swig' %}

        <h2>Last blog posts</h2>
        <div class="row ">
          <div class="col-sm-9">
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
