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
          <li><a href="/projects/old">oldies</a>
        {% endif %}
      </li>
      <li class="active">{{title}}</li>
    </ol>
  </div>

  {% if not nocover %}
    <div class="cover">
      <picture>
        <source
          media="(min-width: 93.375em)"
          srcset="/img/cover/{{path|slug}}-1920.jpg 1x, /img/cover/{{path|slug}}.jpg 2x">
        <source
          media="(min-width: 62em)"
          srcset="/img/cover/{{path|slug}}-1500.jpg 1x, /img/cover/{{path|slug}}.jpg 2x">
        <source
          media="(min-width: 48em)"
          srcset="/img/cover/{{path|slug}}-990.jpg 1x, /img/cover/{{path|slug}}-1920.jpg 2x">
        <source
          media="(min-width: 30em)"
          srcset="/img/cover/{{path|slug}}-480.jpg 1x, /img/cover/{{path|slug}}-990.jpg 2x">
        <source srcset="/img/cover/{{path|slug}}-400.jpg 1x, /img/cover/{{path|slug}}-400@2x.jpg 2x">
        <img src="/img/cover/{{path|slug}}-1500.jpg">
      </picture>
      <div class="inset-shadow"></div>
    </div>
  {% endif %}

  <div class="article-container" id="article-container">
    <div class="text-center">
      <h1>{{title}}</h1>
      <div class="date">
        {{date|date('d.m.Y')}} &bullet; {{author}}
      </div>
    </div>

    <article id="article">
      {{ contents|raw }}
    </article>

    {% if collection == 'posts' %}
      <div class="spacer spacer-xs"></div>
      <hr>
      <div class="spacer spacer-xs"></div>
      <div id="disqus_thread"></div>
      <script type="text/javascript">
          /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
          var disqus_shortname = 'yago-io'; // required: replace example with your forum shortname

          /* * * DON'T EDIT BELOW THIS LINE * * */
          (function() {
              var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
              dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
              (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
          })();
      </script>
      <noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
    {% endif %}
  </div>

{% endblock %}
