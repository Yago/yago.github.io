import React from "react";
import rehypeReact from "rehype-react";
import Helmet from "react-helmet";
import Link from "gatsby-link";

import 'prismjs/themes/prism.css'

import Picture from "../components/picture";
import GalleryItem from "../components/galleryItem";

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    "picture": Picture,
    "gallery-item": GalleryItem
  },
}).Compiler;

export default function Template({
  data 
}) {
  const post = data.markdownRemark;

  return (
    <div className="blog-post-container">

      <Link to='/'>Home</Link> &rsaquo; {post.frontmatter.title}

      <Helmet title={`Blogpost - ${post.frontmatter.title}`} />
      <div className="blog-post">
        <h1>{post.frontmatter.title}</h1>
        { renderAst(post.htmlAst) }
      </div>
    </div>
  );
}

export const query = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      htmlAst
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
;