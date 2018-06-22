import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ThemeWrapper from '../StyledComponents/MuiTheme';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import { uploadPost } from '../../store/actions/postActions';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';

class Upload extends Component {
  state = {
    text: '',
    postImage: '',
    errors: {},
    uploaded: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  fileChangedHandler = event => {
    this.setState({
      postImage: event.target.files[0]
    });
    console.log(this.state.postImage);
  };

  textChangedHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  uploadPostHandler = () => {
    const fd = new FormData();
    fd.append('image', this.state.postImage, this.state.postImage.name);

    const postData = {
      text: this.state.text,
      postImage: fd
    };

    this.props.uploadPost(postData);
    this.setState({ uploaded: true });
  };

  render() {
    const { errors } = this.state;
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '90.4vh'
        }}
      >
        <ThemeWrapper>
          <Typography variant="display2">Create A New Post</Typography>
          <Input
            error={errors.text}
            label={errors.text ? errors.text : 'Text'}
            type="text"
            value={this.state.text}
            name="text"
            onChange={this.textChangedHandler}
            style={{ marginTop: '3rem', width: '60rem' }}
          />
          <input
            error={errors.postImage}
            label={errors.postImage ? errors.postImage : null}
            type="file"
            onChange={this.fileChangedHandler}
            style={{ marginTop: '3rem', width: '40rem' }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ width: '15rem', marginTop: '4rem' }}
            onClick={this.uploadPostHandler}
          >
            Upload Post
          </Button>
        </ThemeWrapper>
      </div>
    );
  }
}

Upload.propTypes = {
  uploadPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { uploadPost }
)(Upload);
