<script>
  var router,
      scope,
      sitemap = {};

  sitemap.base = [],
  sitemap.projects = [],
  sitemap.oldies = [],
  sitemap.posts = [];

  sitemap.base.push('projects');
  sitemap.base.push('blog');

  {% for project in collections.projects %}
    sitemap.projects.push('{{project.path|slug}}');
  {% endfor %}
  sitemap.projects.push('oldies');

  {% for oldie in collections.oldies %}
    sitemap.oldies.push('{{oldie.path|slug}}');
  {% endfor %}

  {% for post in collections.posts %}
    sitemap.posts.push('{{post.path|slug}}');
  {% endfor %}

  // Define scope
  var init = function () {
    {% if collection.length > 0 %}
      scope = '{{collection}}';
    {% else %}
      var blogRegexp = new RegExp('^\/(blog)'),
          projectRegexp = new RegExp('^\/(projects)'),
          oldyRegexp = new RegExp('^\/(projects)\/(old)');

      if (blogRegexp.test(window.location.pathname)) {scope = 'parent-blog';}
      else if (oldyRegexp.test(window.location.pathname)) {scope = 'parent-oldies';}
      else if (projectRegexp.test(window.location.pathname)) {scope = 'parent-projects';}
      else {scope = 'home';}
    {% endif %}
    console.log(scope);
  };

  init();
</script>
