{% extends "base.swig" %}

{% block content %}
<div class="container">
  <div class="row">
    <div class="col-sm-8 col-sm-offset-2">
      <h2>Oldies</h2>
      <div class="spacer spacer-sm"></div>
      <div class="row row-flex">
        {% for project in collections.oldies %}
          {% include '../components/molecules/project-item.swig' with project %}
        {% endfor %}
      </div>
    </div>
  </div>
</div>
{% endblock %}
