const path = require('path');
const createPaginatedPages = require("gatsby-paginate");

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;
  const blogPostTemplate = path.resolve(`src/templates/post.js`);

  return graphql(`{
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          html
          id
          frontmatter {
            date
            path
            title
          }
        }
      }
    }
  }`)
  .then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    createPaginatedPages({
      edges: result.data.allMarkdownRemark.edges,
      createPage,
      pageTemplate: "./src/templates/blog.js",
      pageLength: 10,
      pathPrefix: "blog",
      context: {}
    });

    result.data.allMarkdownRemark.edges
      .forEach(({ node }) => {
        createPage({
          path: node.frontmatter.path,
          component: blogPostTemplate,
          context: {} // additional data can be passed via context
        });
      });
  });
}