import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Stories from './components/Stories';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom';

const App = () => (
  <Router>
    <ul className="nav-bar">
      <li className="nav-item">
        <NavLink className="nav-link" activeClassName="active" exact to="/">
          Top
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/new">
          New
        </NavLink>
      </li>
    </ul>
    <Switch>
      <Route key="/" exact path="/" render={props => <Stories {...props} />} />
      <Route
        key="/new"
        exact
        path="/new"
        render={props => <Stories category="new" {...props} />}
      />
    </Switch>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('app'));
