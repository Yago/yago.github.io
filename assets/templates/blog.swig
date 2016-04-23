{% extends "base.swig" %}

{% block content %}
<div class="container">
  <div class="row">
    <div class="col-sm-6 col-sm-offset-3">
      <h1 class="h2 text-center">Blog</h1>

      <div class="spacer spacer-sm"></div>
      {% for post in pagination.files %}
        {% include '../components/molecules/post-item.swig' with post %}
      {% endfor %}
      <div class="spacer spacer-sm"></div>

      <div class="pagers">
        {% if pagination.next.path %}
          <a href="/{{pagination.next.path}}">&lsaquo; Previous</a>
          &nbsp;&nbsp;&nbsp;
        {% endif %}
        {% if pagination.previous.path %}
          <a href="/{{pagination.previous.path}}">Next &rsaquo;</a>
        {% endif %}
      </div>
    </div>
  </div>
</div>
{% endblock %}
