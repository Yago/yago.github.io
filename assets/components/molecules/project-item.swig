<a href="/{{project.path}}" class="project-item col-sm-4">
  <h4>{{project.title}}.</h4>
  <div class="project-thumb">
    <picture>
      <source
        media="(min-width: 62em)"
        srcset="/img/thumbs/{{project.path|slug}}-280.jpg 1x, /img/thumbs/{{project.path|slug}}-280@2x.jpg 2x">
      <source
        media="(min-width: 48em)"
        srcset="/img/thumbs/{{project.path|slug}}-180.jpg 1x, /img/thumbs/{{project.path|slug}}-180@2x.jpg 2x">
      <source srcset="/img/thumbs/{{project.path|slug}}-400.jpg 1x, /img/thumbs/{{project.path|slug}}-400@2x.jpg 2x">
      <img src="/img/thumbs/{{project.path|slug}}-280.jpg">
    </picture>
  </div>
</a>
