{% extends "base.swig" %}

{% block content %}
  <div class="article-container">
    {{ contents|raw }}
  </div>
  <div class="container">
    {% include '../components/atoms/contributions.swig' %}
    <div class="spacer"></div>
    <div id="personnal-infos" class="personnal-infos"></div>
    <div id="pie-chart" class="pie-chart"></div>

  </div>
{% endblock %}
