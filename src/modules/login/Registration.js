import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as loginActions from '../../redux/actions/loginActions';
import * as tableActions from '../../redux/actions/tableActions';

class Registration extends React.Component {
  state = {
    login: '',
    password: '',
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.loginData.isLoggedIn && this.props.loginData.isLoggedIn) {
      this.props.history.push('/home');
    }
  }

  handleChange = (field, event) => {
    this.setState({
      [field]: event.target.value,
    });
  };

  handleSignIn = () => {
    this.props.onSignIn(this.state.login, this.state.password);
  };

  renderError = () => {
    if (this.props.loginData.isLoginFailed) {
      return (
        <div>
          <p className=" Error text-danger">Enter the correct username and password!</p>
        </div>
      );
    }
  };

  render() {
    return (
      <div id="main" className="container">
        <table className="table table-bordered">
          <thead />
          <tbody>
            <tr>
              <td>
                Login:
                <input
                  className="form-control"
                  value={this.state.login}
                  onChange={this.handleChange.bind(this, 'login')}
                />
              </td>
              <td>
                Password:
                <input
                  className="form-control"
                  value={this.state.password}
                  onChange={this.handleChange.bind(this, 'password')}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <input
          type="button"
          className="btn btn-primary btn-lg"
          value="Отправить"
          onClick={this.handleSignIn}
        />
        {this.renderError()}
      </div>
    );
  }
}

export default connect(
  state => ({
    loginData: state.loginReducer,
  }),
  dispatch => ({
    onChangeRowInReducer: bindActionCreators(tableActions.changeRow, dispatch),
    onSignIn: bindActionCreators(loginActions.loginUser, dispatch),
  }),
)(Registration);
