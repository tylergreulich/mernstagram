import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addComment } from '../../store/actions/postActions';
import MuiAddComment from '../StyledComponents/MuiTheme/MuiAddComment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class AddComment extends Component {
  state = {
    text: '',
    account: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmitHandler = (event, id) => {
    event.preventDefault();

    const { text, account } = this.state;
    const { auth } = this.props;

    const newComment = {
      text,
      username: auth.user.username,
      avatar: auth.user.avatar,
      account
    };

    this.props.addComment(id, newComment);
  };

  render() {
    const { errors, text } = this.state;
    const { post } = this.props;

    return (
      <form onSubmit={(event, id) => this.onSubmitHandler(event, post._id)}>
        <MuiAddComment>
          <TextField
            error={errors.text}
            label={errors.text ? errors.text : 'Add a comment...'}
            type="text"
            value={text}
            name="text"
            onChange={event =>
              this.setState({ [event.target.name]: event.target.value })
            }
            style={{ marginTop: '3rem', width: '80%' }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{
              margin: ' 0 0 1.5rem .4rem',
              fontSize: '1.2rem',
              width: '19.4%'
            }}
            type="submit"
          >
            Submit
          </Button>
        </MuiAddComment>
      </form>
    );
  }
}

AddComment.propTypes = {
  auth: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addComment }
)(AddComment);
