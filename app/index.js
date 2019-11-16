import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom';
import Stories from './components/Stories';
import User from './components/User';
import Comments from './components/Comments';
import './index.css';

const App = () => (
  <div className="container light">
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
        <Route
          key="/"
          exact
          path="/"
          render={props => <Stories {...props} />}
        />
        <Route
          key="/new"
          exact
          path="/new"
          render={props => <Stories category="new" {...props} />}
        />
        <Route path="/user" component={User} />
        <Route path="/post" component={Comments} />
      </Switch>
    </Router>
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
