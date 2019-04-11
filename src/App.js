import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loggedInUser: {}
    };
  }

componetDidMount(){
  axios.get('/auth/user').then(res => {

  })
}

 login() {
    let {email, password} = this.state;
axios.post('/auth/login', {email, password}).then(res => {
  this.setState({
    loggedInUser: res.data,
    email: "",
    password: ""
  })
})
  }



   signup() {
    let {email, password} = this.state;
  axios.post('/auth/signup', {email, password}).then(res => {
    this.setState({
      loggedInUser: res.data,
      email: "",
      password: ""
    })
  })

  }

  logout() {
    axios.get('/auth/logout').then(() =>{
      this.setState({ loggedInUser:{}})
    })
  }

  render() {
    let { loggedInUser, email, password } = this.state;
    return (
      <div className="form-container done">
        <div className="login-form">
          <h3>Auth w/ Bcrypt</h3>
          <div>
            <input
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
              type="text"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              value={password}
              type="password"
              onChange={e => this.setState({ password: e.target.value })}
              placeholder="password"
            />
          </div>
          {loggedInUser.email ? (
            <button onClick={() => this.logout()}>Logout</button>
          ) : (
            <button onClick={() => this.login()}>Login</button>
          )}
          <button onClick={() => this.signup()}>Sign up</button>
        </div>

        <hr />

        <h4>Status: {loggedInUser.email ? 'Logged In' : 'Logged Out'}</h4>
        <h4>User Data:</h4>
        <p> {loggedInUser.email ? JSON.stringify(loggedInUser) : 'No User'} </p>
        <br />
      </div>
    );
  }
}

export default App;
