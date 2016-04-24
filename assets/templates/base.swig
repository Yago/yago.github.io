<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>{{ title }}</title>
    <meta name="description" content="">
    <meta name="keywords" content="HTML,CSS,XML,JavaScript">
    <meta name="viewport" content="width=device-width">

    <link rel="stylesheet" href="/css/vendors.min.css">
    <link rel="stylesheet" href="/css/types.css">
    <link rel="stylesheet" href="/css/main.css">

    <link rel="shortcut icon" href="/favicons/favicon.ico" type="image/x-icon" />
    <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-touch-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon-180x180.png">
    <link rel="icon" type="image/png" href="/favicons/favicon-16x16.png" sizes="16x16">
    <link rel="icon" type="image/png" href="/favicons/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="/favicons/favicon-96x96.png" sizes="96x96">
    <link rel="icon" type="image/png" href="/favicons/android-chrome-192x192.png" sizes="192x192">
    <meta name="msapplication-square70x70logo" content="/favicons/smalltile.png" />
    <meta name="msapplication-square150x150logo" content="/favicons/mediumtile.png" />
    <meta name="msapplication-wide310x150logo" content="/favicons/widetile.png" />
    <meta name="msapplication-square310x310logo" content="/favicons/largetile.png" />

    <script src="https://use.typekit.net/cwx4xcg.js"></script>
    <script>try{Typekit.load({ async: true });}catch(e){}</script>

    <!--[if lt IE 9]>
      <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
  </head>
  <body>
    <div id="main" class="main-wrapper">
      <div id="content-wrapper" class="content-wrapper">
        {% include '../components/organisms/header.swig' %}
        <div class="smooth-content" id="smooth-content">
          {% block content %}{% endblock %}
        </div>
        {% include '../components/organisms/footer.swig' %}
      </div>
      {% include '../components/organisms/panel-console.swig' %}
      {% include '../components/organisms/panel-menu.swig' %}

      {% include '../components/organisms/console-helper.swig' %}

      {% if collection.length > 0  %}
        {% include '../components/organisms/photoswipe.swig' %}
      {% endif %}
    </div>


    <script src="/js/vendors.min.js"></script>
    <script src="/js/main.js"></script>

    <script type="text/javascript">
      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-41124823-1']);
      _gaq.push(['_trackPageview']);

      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();
    </script>
  </body>
</html>
