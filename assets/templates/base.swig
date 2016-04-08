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

    <script src="https://use.typekit.net/cwx4xcg.js"></script>
    <script>try{Typekit.load({ async: true });}catch(e){}</script>

    <!--[if lt IE 9]>
      <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
  </head>
  <body>
    <div class="main-wrapper">
      <div id="content-wrapper" class="content-wrapper left-open">
        {% include '../components/organisms/header.swig' %}
        {% block content %}{% endblock %}
      </div>
      <div id="console-wrapper" class="side-wrapper console-wrapper open">
        <div id="console" class="console"></div>
      </div>
      <div id="menu-wrapper" class="side-wrapper menu-wrapper">
        <div id="menu" class="menu"></div>
      </div>
    </div>


    <script src="/js/vendors.min.js"></script>
    <script src="/js/main.js"></script>
  </body>
</html>
