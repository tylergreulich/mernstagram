import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ThemeWrapper from '../StyledComponents/MuiTheme';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import { uploadPost } from '../../store/actions/postActions';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Spinner from '../UI/Spinner';

class Upload extends Component {
  state = {
    textEmpty: '',
    textChar: '',
    text: '',
    postImage: null,
    errors: {},
    imgError: '',
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
  };

  textChangedHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  uploadPostHandler = () => {
    if (
      this.state.postImage &&
      this.state.text &&
      this.state.text.length >= 9
    ) {
      const fd = new FormData();
      fd.append('postImage', this.state.postImage, this.state.postImage.name);
      fd.append('text', this.state.text);

      this.props.uploadPost(fd);
      this.setState({ uploaded: true });
    } else if (this.state.text.length < 9) {
      this.setState({
        textChar: 'Text field must be greater than 10 characters'
      });
    } else if (!this.state.postImage) {
      this.setState({ imgError: 'Please upload an image!' });
    } else {
      this.setState({
        imgError: '',
        textChar: ''
      });
    }
  };

  render() {
    const { uploaded, errors, textEmpty, textChar } = this.state;

    if (uploaded) {
      setTimeout(() => {
        this.props.history.push('/feed');
      }, 2500);
    }

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
          <TextField
            error={textChar ? true : null}
            label={textChar ? textChar : 'Post Description'}
            type="text"
            value={this.state.text}
            name="text"
            onChange={this.textChangedHandler}
            style={{ marginTop: '3rem', width: '60rem' }}
          />
          <TextField
            type="file"
            onChange={this.fileChangedHandler}
            style={{ marginTop: '3rem', width: '40rem' }}
            name="postImage"
          />
          {this.state.imgError ? (
            <span style={{ color: 'red', fontSize: '2rem' }}>
              {this.state.imgError}
            </span>
          ) : null}
          <Button
            variant="contained"
            color="primary"
            style={{ width: '15rem', marginTop: '4rem' }}
            onClick={this.uploadPostHandler}
          >
            {this.state.uploaded ? (
              <span>Uploaded!</span>
            ) : (
              <span>Upload Post</span>
            )}
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
