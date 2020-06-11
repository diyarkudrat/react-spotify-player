import React, { Component } from 'react';
// import hash from "./hash";
import logo from './logo.svg';
import './App.css';

export const authEndpoint =
'https://accounts.spotify.com/authorize';

const clientId = 'a26a6acae9184ea8bd9acc1a9742defa';
const redirectUri = "https://localhost:3000";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
]

const hash = window.location.hash
  .substring(1)
  .split('&')
  .reduce(function(initial, item) {
    if(item) {
      var parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1])
    }
    return initial;
  }, {});

window.location.hash = '';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

class App extends Component {
  componentDidMount() {
    //set token
    let _token = hash.access_token;
    if (_token) {
      this.setState({
        token: _token
      });
    }
  }

  render() {
    return (
      <div className='App'>
        <header className='App-logo' alt='logo'>
          <img src={logo} className="App-logo" alt="logo" />
          {!this.state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          )}
        </header>

      </div>
    )
  }
}

export default App;
