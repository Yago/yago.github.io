<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Yann Gouffon | {{ title }}</title>

    <meta name="description" content="Ahoy there ! I'm Yann, a web adventurer who designs and code. I'm focused on modular, performant and maintainable development.">
    <meta name="keywords" content="yann, gouffon, developer, frontend, html, javascript, sass, css, php">
    <meta name="viewport" content="width=device-width">
    <meta property="og:title" content="Yann Gouffon | frontend developer and designer" />
    <meta property="og:type" content="website" />
    <meta property="og:description" content="Ahoy there ! I'm Yann, a web adventurer who designs and code. I'm focused on modular, performant and maintainable development." />
    <meta property="og:site_name" content="Yann Gouffon, frontend developer and designer" />
    <meta property="og:url" content="http://yago.io" />
    <meta property="og:image" content="http://yago.io/img/yago.png" />

    <link rel="stylesheet" href="/css/vendors.min.css">
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

    <link rel="preload" href="/css/types.css" as="style" onload="this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="/css/types.css"></noscript>
    <script src="/js/head.min.js"></script>

    <script>
      (function(d) {
        var config = {
          kitId: 'cwx4xcg',
          scriptTimeout: 3000,
          async: true
        },
        h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
      })(document);
    </script>

    <script>
      // Picture element HTML5 shiv
      document.createElement( "picture" );
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/picturefill/3.0.2/picturefill.min.js" async></script>

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
