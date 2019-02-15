import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import moment from 'moment';

const PostTeaser = ({ post }) => (
  <Link to={post.frontmatter.path} className="post-teaser my-2">
    <h3>
      <span>{post.frontmatter.title}</span>
      <small className="text-sans text-muted">
        <span> — </span>
        {moment(post.frontmatter.date).format('LL')}
      </small>
    </h3>
    <p className="text-muted">{post.excerpt}</p>
  </Link>
);

PostTeaser.propTypes = { post: PropTypes.object.isRequired };

export default PostTeaser;
