import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../UI/Spinner';
import { getPosts } from '../../store/actions/postActions';
import PostFeed from './PostFeed';

class Posts extends Component {
  state = {};

  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.post;

    let postContent;

    if (posts === null || loading) {
      postContent = <h3>Loading</h3>;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return <div>{postContent}</div>;
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
