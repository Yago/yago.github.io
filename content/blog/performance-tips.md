---
title: Quick performances in 3 tips
author: Yann Gouffon
date: 2016-05-03
collection: posts
tags: web
nocover: true
---

Performance is in heart of any discussions those days. Buidling amazing and fancy website is nice, but if half of users quite because of lack of performance, it's simply useless.

Since I remake my own website recently, I think it will be a good opportunity to present some methode to quickly improve performances. I choose to split this article into **three major tip**s that will make the difference. To illustrate the evolution, I will use Google [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/). It's not the only tool I use to analyse performances, but the quick notation give a good insight of the situation.

## Before starting
Right after the first release of this website, I didn't make any optimisation. I keep it in mind during all the development process, but normally and for small realisations like this, I do all the performance improvements at the end. 

So, for now the performance are pretty bad. **PageSpeed** give me 41/100 on mobile and 48/100 on desktop which is really bad. I take also a quick look on [WebPageTest](http://www.webpagetest.org) and I found that my site taks around **3 seconds to load**, which also not good at all for such a minimalist interface...

[![Not very brilliant...](/img/small/perf-starting.jpg)](/img/larges/perf-starting.jpg)

## Tips 1 : the Picture tag
Like any conscious frontend developer, **I properly compress all my images** with the finests tools on the market, but sadly (or not), it's not enought. Even if you use a 20% compression and you still serve a 2000px large image to iPhone4 users, they don't going to like you. So, you have to **serve various images sizes depending on devices resolutions**.

To do it, you can use the `<picture>` tag and because it syntax is not fully supported, a great [polyfill](http://scottjehl.github.io/picturefill/) is available.

In your `<head>` :

```html
<script>
  // Picture element HTML5 shiv
  document.createElement( "picture" );
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/picturefill/3.0.2/picturefill.min.js" async></script>
```

In your code :

```html
<picture>
  <source
    media="(min-width: 62em)"
    srcset="/img/big-img.jpg 1x, /img/big-img@2x.jpg 2x">
  <source
    media="(min-width: 48em)"
    srcset="/img/medium-im.jpg 1x, /img/medium-im@2x.jpg 2x">
  <source srcset="/img/small-img.jpg 1x, /img/small-img@2x.jpg 2x">
  <img src="/img/default-img.jpg">
</picture>
```

Only with this “small” improvement, I win **6 ms** on loading and PageSpeed give me **57**/100 on mobile and **79**/100 on desktop which start to be much better ! Learn more about picture tag on [RICG website](http://ricg.io/).

[![Result of picture tag](/img/small/perf-picture.jpg)](/img/larges/perf-picture.jpg)
