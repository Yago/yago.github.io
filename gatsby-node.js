const path = require('path');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const PostTemplate = path.resolve('./src/templates/PostTemplate.jsx');
  const ProjectTemplate = path.resolve('./src/templates/ProjectTemplate.jsx');

  return graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
        edges {
          node {
            id
            frontmatter {
              path
              title
              type
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      const component = node.frontmatter.type === 'post' ? PostTemplate : ProjectTemplate;

      createPage({
        path: node.frontmatter.path,
        component,
        context: {
          id: node.frontmatter.id,
        },
      });
    });
  });
};
