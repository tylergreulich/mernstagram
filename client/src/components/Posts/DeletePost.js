import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { deletePost } from '../../store/actions/postActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class DeletePost extends Component {
  onDeletePostHandler = id => this.props.deletePost(id);

  render() {
    const {
      auth: { isAuthenticated, user },
      post: { account, _id }
    } = this.props;

    let isUserPost;

    if (isAuthenticated && account) {
      if (user.id === account) {
        isUserPost = (
          <IconButton
            aria-label="Delete"
            style={{
              alignSelf: 'center',
              fontSize: '2.4rem',
              cursor: 'pointer',
              marginRight: '1.25rem'
            }}
            onClick={id => this.onDeletePostHandler(_id)}
          >
            <DeleteIcon />
          </IconButton>
        );
      }
    }
    return <div>{isUserPost}</div>;
  }
}

DeletePost.propTypes = {
  deletePost: PropTypes.func.isRequired
};

export default connect(
  null,
  { deletePost }
)(DeletePost);