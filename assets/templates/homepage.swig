{% extends "base.swig" %}

{% block content %}
  <div class="article-container">
    {{ contents|raw }}
  </div>
  <div class="container">
    <div class="spacer"></div>
    <div id="personnal-infos" class="personnal-infos"></div>
    <div id="pie-chart" class="pie-chart"></div>
    <iframe src="https://github.com/users/yago/contributions" frameborder="0" width="100%" height="100px"></iframe>
  </div>
{% endblock %}
