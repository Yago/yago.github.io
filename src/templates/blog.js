import React, { Component } from "react";
import Link from "gatsby-link";

const NavLink = props => {
  if (!props.test) {
    return <Link to={props.url}>{props.text}</Link>;
  } else {
    return <span>{props.text}</span>;
  }
};

export default function Index({ data, pathContext }) {
  const { edges: posts } = data.allMarkdownRemark;
  const { group, index, first, last, pageCount } = pathContext;
  const previousUrl = index - 1 == 1 ? "" : (index - 1).toString();
  const nextUrl = (index + 1).toString();

  return (
    <div className="blog-posts">
      {group
        .filter(post => post.node.frontmatter.title.length > 0)
        .map(({ node: post }) => {
          return (
            <div className="blog-post-preview" key={post.id}>
              <h1>
                <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
              </h1>
              <em>{post.frontmatter.type}</em>
              <p>{post.excerpt}</p>
            </div>
          );
        })}

        <div className="previousLink">
          <NavLink test={first} url={`/blog/${previousUrl}`} text="Go to Previous Page" />
        </div>
        <div className="nextLink">
          <NavLink test={last} url={`/blog/${nextUrl}`} text="Go to Next Page" />
        </div>
    </div>
  );
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            type
          }
        }
      }
    }
  }
`;