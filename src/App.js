import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Stats from './Stats'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Router>

              <Link to="/">front page</Link>
          <Link to="/profile">profile</Link>
          <Link to="/profile/76561198075543642">test</Link>
          <Route path="/profile/:id(\d+)" component={Stats} />

      </Router>
    </div>
  );
}

export default App;
