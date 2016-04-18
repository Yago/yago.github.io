{% extends "base.swig" %}

{% block content %}
<div class="container">
  <div class="row">
    <div class="col-sm-8 col-sm-offset-2">
      <h2>Projects</h2>
      <div class="spacer spacer-sm"></div>
      <div class="row row-flex">
        {% for project in collections.projects %}
          {% include '../components/molecules/project-item.swig' with project %}
        {% endfor %}
        <a href="/projects/old" class="project-item col-sm-4">
          <h4><i class="icon icon-hammer"></i> Old Projects.</h4>
          <div class="project-thumb"></div>
        </a>
      </div>
    </div>
  </div>
</div>
{% endblock %}
